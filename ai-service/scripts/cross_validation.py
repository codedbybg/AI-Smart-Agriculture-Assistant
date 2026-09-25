import pandas as pd

from sklearn.model_selection import (
    StratifiedKFold,
    cross_val_score
)

from sklearn.ensemble import RandomForestClassifier


# ----------------------------------------
# Load dataset
# ----------------------------------------

# DATASET_PATH = "../data/crop_recommendation.csv"

df = pd.read_csv(
    "data/crop_recommendation.csv"
)


# ----------------------------------------
# Features
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


# ----------------------------------------
# Model
# ----------------------------------------

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    n_jobs=-1,
)


# ----------------------------------------
# Stratified K-Fold
# ----------------------------------------

cv = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42,
)


scores = cross_val_score(
    model,
    X,
    y,
    cv=cv,
    scoring="accuracy",
)


print("\nCross-validation scores:")

for index, score in enumerate(
    scores,
    start=1
):
    print(
        f"Fold {index}: {score:.4f}"
    )


print(
    f"\nMean Accuracy: {scores.mean():.4f}"
)


print(
    f"Standard Deviation: {scores.std():.4f}"
)