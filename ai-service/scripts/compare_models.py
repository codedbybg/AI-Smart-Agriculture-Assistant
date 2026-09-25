import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC

from sklearn.pipeline import Pipeline

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
)


# ----------------------------------------
# 1. Load dataset
# ----------------------------------------

# DATASET_PATH = "../data/crop_recommendation.csv"

df = pd.read_csv("data/crop_recommendation.csv")


print("Dataset loaded successfully.")

print("Dataset shape:", df.shape)


# ----------------------------------------
# 2. Features and target
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
# 3. Train/Test split
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
# 4. Define models
# ----------------------------------------

models = {

    "Logistic Regression": Pipeline(
        [
            (
                "scaler",
                StandardScaler()
            ),

            (
                "model",
                LogisticRegression(
                    max_iter=2000
                )
            ),
        ]
    ),


    "Decision Tree": DecisionTreeClassifier(
        random_state=42
    ),


    "Random Forest": RandomForestClassifier(
        n_estimators=300,
        random_state=42,
        n_jobs=-1
    ),


    "KNN": Pipeline(
        [
            (
                "scaler",
                StandardScaler()
            ),

            (
                "model",
                KNeighborsClassifier(
                    n_neighbors=5
                )
            ),
        ]
    ),


    "SVM": Pipeline(
        [
            (
                "scaler",
                StandardScaler()
            ),

            (
                "model",
                SVC(
                    probability=True,
                    random_state=42
                )
            ),
        ]
    ),
}


# ----------------------------------------
# 5. Train and evaluate
# ----------------------------------------

results = []


for model_name, model in models.items():

    print("\n" + "=" * 60)

    print(
        f"Training: {model_name}"
    )

    print("=" * 60)


    # Train
    model.fit(
        X_train,
        y_train
    )


    # Predict
    y_pred = model.predict(
        X_test
    )


    # Metrics
    accuracy = accuracy_score(
        y_test,
        y_pred
    )


    precision = precision_score(
        y_test,
        y_pred,
        average="weighted",
        zero_division=0
    )


    recall = recall_score(
        y_test,
        y_pred,
        average="weighted",
        zero_division=0
    )


    f1 = f1_score(
        y_test,
        y_pred,
        average="weighted",
        zero_division=0
    )


    results.append(
        {
            "Model": model_name,
            "Accuracy": accuracy,
            "Precision": precision,
            "Recall": recall,
            "F1 Score": f1,
        }
    )


    print(
        f"Accuracy:  {accuracy:.4f}"
    )

    print(
        f"Precision: {precision:.4f}"
    )

    print(
        f"Recall:    {recall:.4f}"
    )

    print(
        f"F1 Score:  {f1:.4f}"
    )


# ----------------------------------------
# 6. Results table
# ----------------------------------------

results_df = pd.DataFrame(
    results
)


print("\n\n")
print("=" * 80)
print("MODEL COMPARISON")
print("=" * 80)

print(
    results_df.to_string(
        index=False
    )
)

results_df.to_csv(
    "models/model_comparison.csv",
    index=False
)

print(
    "\nResults saved to:"
)

print(
    "models/model_comparison.csv"
)