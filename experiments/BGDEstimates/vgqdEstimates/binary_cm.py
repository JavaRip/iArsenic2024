import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, accuracy_score

# Constants
MODEL_VERSION = "m150_10"
RISK_COL = f"{MODEL_VERSION}_risk_assessment"
EXPECTED_COL = "expected_risk"
THRESHOLD = 3
INPUT_CSV = 'vgqd_with_predictions.csv'
OUTPUT_IMG = f"{MODEL_VERSION}_binary_confusion_matrix.png"
OUTPUT_CSV = f"{MODEL_VERSION}_binary_with_predictions.csv"

# Load data
df = pd.read_csv(INPUT_CSV)

# Drop rows with missing values
df = df.dropna(subset=[RISK_COL, EXPECTED_COL]).copy()

# Ensure numeric types
df[RISK_COL] = pd.to_numeric(df[RISK_COL], errors="coerce")
df[EXPECTED_COL] = pd.to_numeric(df[EXPECTED_COL], errors="coerce")

# Binary classification: Safe (0) if < 3, Unsafe (1) if >= 3
df["expected_binary"] = df[EXPECTED_COL].apply(lambda x: 0 if x < THRESHOLD else 1)
df["predicted_binary"] = df[RISK_COL].apply(lambda x: 0 if x < THRESHOLD else 1)

# Mark correctness
df["prediction_correct"] = df["expected_binary"] == df["predicted_binary"]

# Compute confusion matrix
cm = confusion_matrix(df["expected_binary"], df["predicted_binary"], labels=[0, 1])
cm_df = pd.DataFrame(cm,
                     index=["Expected Safe (<3)", "Expected Unsafe (≥3)"],
                     columns=["Predicted Safe (<3)", "Predicted Unsafe (≥3)"])

# Plot
plt.figure(figsize=(8, 6))
sns.heatmap(cm_df, annot=True, fmt="d", cmap="Blues", cbar=False)
plt.title(f"Binary Confusion Matrix for {MODEL_VERSION}")
plt.xlabel("Predicted")
plt.ylabel("Expected")
plt.tight_layout()
plt.savefig(OUTPUT_IMG)
plt.show()

# Accuracy
accuracy = accuracy_score(df["expected_binary"], df["predicted_binary"])
print(f"Binary classification accuracy for {MODEL_VERSION}: {accuracy:.2%}")

# Save annotated DataFrame
df.to_csv(OUTPUT_CSV, index=False)
print(f"Saved binary classification results to: {OUTPUT_CSV}")
