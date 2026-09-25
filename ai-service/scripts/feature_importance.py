import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
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
# Split
# ----------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y,
)


# ----------------------------------------
# Train model
# ----------------------------------------

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    n_jobs=-1,
)


model.fit(
    X_train,
    y_train
)


# ----------------------------------------
# Feature importance
# ----------------------------------------

importance = pd.DataFrame(
    {
        "Feature": features,
        "Importance": model.feature_importances_,
    }
)


importance = importance.sort_values(
    by="Importance",
    ascending=False
)


print("\nFeature Importance:")
print(
    importance.to_string(
        index=False
    )
)


# ----------------------------------------
# Plot
# ----------------------------------------

plt.figure(
    figsize=(10, 6)
)


sns.barplot(
    data=importance,
    x="Importance",
    y="Feature"
)


plt.title(
    "Random Forest Feature Importance"
)


plt.tight_layout()


plt.savefig(
    "models/feature_importance.png",
    dpi=300,
    bbox_inches="tight"
)


plt.show()