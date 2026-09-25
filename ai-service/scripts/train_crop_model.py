import os

import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.ensemble import RandomForestClassifier


# ----------------------------------------
# Paths
# ----------------------------------------

# DATASET_PATH = "../data/crop_recommendation.csv"
MODEL_DIR = "models"

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "crop_recommendation_model.pkl"
)


# ----------------------------------------
# Load dataset
# ----------------------------------------

df = pd.read_csv("data/Crop_recommendation.csv")


print("Dataset loaded successfully.")
print("Shape:", df.shape)


# ----------------------------------------
# Features and target
# ----------------------------------------

features = [
    "N",
    "P",
    "K",
    "temperature",
    "humidity",
    "ph",
    "rainfall",
]


X = df[features]

y = df["label"]


print("\nFeatures:")
print(features)


print("\nTarget classes:")
print(y.nunique())


# ----------------------------------------
# Train/Test split
# ----------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y,
)


print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))


# ----------------------------------------
# Create model
# ----------------------------------------

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    n_jobs=-1,
)


# ----------------------------------------
# Train
# ----------------------------------------

print("\nTraining Random Forest...")

model.fit(
    X_train,
    y_train
)


print("Training completed.")


# ----------------------------------------
# Prediction
# ----------------------------------------

y_pred = model.predict(X_test)


# ----------------------------------------
# Evaluation
# ----------------------------------------

accuracy = accuracy_score(
    y_test,
    y_pred
)


print("\n========== MODEL RESULTS ==========")

print(
    f"Accuracy: {accuracy:.4f}"
)


print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred
    )
)


# ----------------------------------------
# Save model package
# ----------------------------------------

os.makedirs(
    MODEL_DIR,
    exist_ok=True
)

model_package = {
    "model": model,
    "features": features,
    "model_name": "Random Forest",
}

joblib.dump(
    model_package,
    MODEL_PATH
)


print("\nModel saved successfully:")

print(MODEL_PATH)