import importlib

pd = importlib.import_module("pandas")

# DATASET_PATH = "/data/crop_recommendation.csv"

# Load Dataset
df = pd.read_csv("data/crop_recommendation.csv")

print("\n ================= FIRST 5 ROWS ============")
print(df.head())

print("\n ================= DATASET SHAPE ===========")
print(df.shape)

print("\n ================= COLUMN NAMES ============")
print(df.columns.tolist())

print("\n ================ DATA TYPES ===============")
print(df.dtypes)

print("\n ================ MISSING VALUES =============")
print(df.isnull().sum())

print("\n ================ DUPLICATE ROWS ============")
print(df.duplicated().sum())

print("\n =============== STATISTICAL SUMMARY ==========")
print(df.describe())

print("\n ============= TARGET DISTRIBUTION ============")
print(df["label"].value_counts())

