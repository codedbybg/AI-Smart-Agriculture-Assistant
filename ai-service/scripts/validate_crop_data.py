import importlib

pd = importlib.import_module("pandas")

# DATASET_PATH = "/data/crop_recommendation.csv"

df = pd.read_csv("data/crop_recommendation.csv")


required_columns = [
    "N",
    "P",
    "K",
    "temperature",
    "humidity",
    "ph",
    "rainfall",
    "label",
]

print("Checking required columns...\n")

missing_columns = [
    column
    for column in required_columns
    if column not in df.columns
]

if missing_columns:
    print( "Missing columns: ", missing_columns )
else:
    print("All required columns are present.")
    

print("\nMissing Values: ")
print(df[required_columns].isnull().sum())

print("\nDuplicate rows:")
print(df.duplicated().sum())

print("\nUnique crops:")
print(df["label"].nunique())

print("\nCrop names:")
print(
    sorted( df["label"].unique() )
)