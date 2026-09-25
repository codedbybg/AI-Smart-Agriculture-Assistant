import joblib
import pandas as pd


MODEL_PATH = "models/crop_recommendation_model.pkl"


# Load trained model
model_package = joblib.load(MODEL_PATH)

model = model_package["model"]

features = model_package["features"]


print("Model loaded successfully.")


# Example input
sample = pd.DataFrame(
    [
        {
            "N": 90,
            "P": 42,
            "K": 43,
            "temperature": 25,
            "humidity": 70,
            "ph": 6.5,
            "rainfall": 800,
        }
    ]
)


# Predict
prediction = model.predict(sample)


print("\nInput:")
print(sample)


print("\nPredicted crop:")
print(prediction[0])


sample = sample[features]


# Prediction probabilities
probabilities = model.predict_proba(sample)

classes = model.classes_

results = sorted(
    zip(classes, probabilities[0]),
    key=lambda x: x[1],
    reverse=True
)


print("\nTop predictions:")

for crop, probability in results[:5]:
    print(
        f"{crop}: {probability:.4f}"
    )