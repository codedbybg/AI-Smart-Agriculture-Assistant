import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix


# ----------------------------------------
# Load dataset
# ----------------------------------------

# DATASET_PATH = "../data/crop_recommendation.csv"

df = pd.read_csv("data/crop_recommendation.csv")


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


# ----------------------------------------
# Train Random Forest
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
# Predict
# ----------------------------------------

y_pred = model.predict(
    X_test
)


# ----------------------------------------
# Confusion Matrix
# ----------------------------------------

cm = confusion_matrix(
    y_test,
    y_pred,
    labels=model.classes_
)


plt.figure(
    figsize=(14, 10)
)


sns.heatmap(
    cm,
    annot=True,
    fmt="d",
    xticklabels=model.classes_,
    yticklabels=model.classes_
)


plt.title(
    "Random Forest Confusion Matrix"
)

plt.xlabel(
    "Predicted Label"
)

plt.ylabel(
    "Actual Label"
)

plt.tight_layout()

plt.savefig(
    "models/random_forest_confusion_matrix.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()