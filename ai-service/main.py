from pathlib import Path

import joblib
import pandas as pd

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field


# --------------------------------------------------
# PATH CONFIGURATION
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "models" / "crop_recommendation_model.pkl"


# --------------------------------------------------
# LOAD MODEL
# --------------------------------------------------

try:
    model_package = joblib.load(MODEL_PATH)

    model = model_package["model"]
    features = model_package["features"]

    print("Crop recommendation model loaded successfully.")

except Exception as error:
    model = None
    features = []

    print("Failed to load crop recommendation model.")
    print("Error:", error)


# --------------------------------------------------
# FASTAPI APP
# --------------------------------------------------

app = FastAPI(
    title="AI Smart Agriculture Assistant",
    description="AI service for agricultural decision support",
    version="1.0.0",
)


# --------------------------------------------------
# REQUEST MODEL
# --------------------------------------------------

class CropPredictionRequest(BaseModel):

    N: float = Field(
        ...,
        ge=0,
        description="Nitrogen value"
    )

    P: float = Field(
        ...,
        ge=0,
        description="Phosphorus value"
    )

    K: float = Field(
        ...,
        ge=0,
        description="Potassium value"
    )

    temperature: float = Field(
        ...,
        description="Temperature in Celsius"
    )

    humidity: float = Field(
        ...,
        ge=0,
        le=100,
        description="Relative humidity percentage"
    )

    ph: float = Field(
        ...,
        ge=0,
        le=14,
        description="Soil pH"
    )

    rainfall: float = Field(
        ...,
        ge=0,
        description="Rainfall"
    )


# --------------------------------------------------
# ROOT ENDPOINT
# --------------------------------------------------

@app.get("/")
def home():

    return {
        "success": True,
        "message": "AI Smart Agriculture Service is running",
        "model_loaded": model is not None,
    }


# --------------------------------------------------
# HEALTH ENDPOINT
# --------------------------------------------------

@app.get("/health")
def health():

    return {
        "success": True,
        "service": "AI Smart Agriculture Service",
        "model_loaded": model is not None,
    }


# --------------------------------------------------
# CROP PREDICTION ENDPOINT
# --------------------------------------------------

@app.post("/predict")
def predict_crop(data: CropPredictionRequest):

    if model is None:

        raise HTTPException(
            status_code=500,
            detail="Crop recommendation model is not loaded."
        )

    try:

        input_data = {
            "N": data.N,
            "P": data.P,
            "K": data.K,
            "temperature": data.temperature,
            "humidity": data.humidity,
            "ph": data.ph,
            "rainfall": data.rainfall,
        }

        # Make sure features are in exactly the same
        # order used during model training.

        input_df = pd.DataFrame(
            [input_data],
            columns=features
        )

        # Prediction

        prediction = model.predict(input_df)[0]

        response = {
            "success": True,
            "prediction": prediction,
            "input": input_data,
        }

        # Prediction probabilities

        if hasattr(model, "predict_proba"):

            probabilities = model.predict_proba(input_df)[0]

            classes = model.classes_

            probability_data = {
                str(class_name): float(probability)
                for class_name, probability
                in zip(classes, probabilities)
            }

            sorted_probabilities = sorted(
                probability_data.items(),
                key=lambda item: item[1],
                reverse=True
            )

            top_predictions = [
                {
                    "crop": crop,
                    "probability": round(probability, 4),
                }
                for crop, probability
                in sorted_probabilities[:5]
            ]

            response["top_predictions"] = top_predictions

            response["confidence"] = round(
                top_predictions[0]["probability"],
                4
            )

        return response

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(error)}"
        )