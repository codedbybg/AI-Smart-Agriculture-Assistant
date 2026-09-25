import importlib

pd = importlib.import_module("pandas")
plt = importlib.import_module("matplotlib.pyplot")

import seaborn as sns

# DATASET_PATH = "ai-service/data/crop_recommendation.csv"

# Load Dataset
df = pd.read_csv("data/crop_recommendation.csv")

print("Dataset Shape : ")
print(df.shape)

print("\nColumns : ")
print(df.columns.tolist())


# ----------------------------
# 1. Crop Distribution
# ----------------------------

plt.figure(figsize=(12,6))

sns.countplot(
    data = df,
    x = "label",
    order = df["label"].value_counts().index
)

plt.xticks(rotation=90)

plt.title("Crop Class Distribution")

plt.xlabel("Crop")

plt.ylabel("Number of Samples")

plt.tight_layout()

plt.show()

# -----------------------------
# 2. Correlation matrix
# -----------------------------

numeric_df = df.select_dtypes(
    include="number"
)

plt.figure(figsize=(10,8))

sns.heatmap(
    numeric_df.corr(),
    annot=True,
    fmt=".2f"
)

plt.title("Feature correlation matrix")

plt.tight_layout()

plt.show()

# -------------------------
# 3. Feature Distribution
# -------------------------

numeric_df.hist(
    figsize=(14,10),
    bins=20
)

plt.suptitle(
    "Distribution of Numeric Features"
)

plt.tight_layout()

plt.show()