

import updateBudgetRanges from "@/Firebase/admin-side/product-rates/updateBudgetRanges";

const updateBudgetRangesService = async (
  newBudgetRanges,
  setShowUpdateSpinner,
  showAlert,
) => {
  // Validation checks
  if (
    newBudgetRanges
      .map(budgetRange => budgetRange.min === 0 || budgetRange.max === 0)
      .includes(true)
  ) {
    return showAlert({ type: "ERROR", message: "Please fill all the fields." });
  } else if (
    newBudgetRanges
      .map(budgetRange => budgetRange.min >= budgetRange.max)
      .includes(true)
  ) {
    return showAlert({
      type: "ERROR",
      message: "Minimum value should be less than maximum value.",
    });
  }

  for (let i = 0; i < newBudgetRanges.length - 1; i++) {
    const currentRange = newBudgetRanges[i];
    const nextRange = newBudgetRanges[i + 1];

    // Check for overlapping ranges
    if (currentRange.max >= nextRange.min) {
      return showAlert({
        type: "ERROR",
        message: "Budget ranges should not overlap.",
      });
    }

    // Check for holes between ranges
    if (currentRange.max + 1 !== nextRange.min) {
      return showAlert({
        type: "ERROR",
        message:
          "There should not be any gaps of more than 1 between budget ranges.",
      });
    }
  }

  setShowUpdateSpinner(true);

  try {
    // Perform the update operation
    const { type, message } = await updateBudgetRanges(newBudgetRanges);

    // Show success or error based on response
    showAlert({ type, message });
  } catch (error) {
    // Handle and display any errors that occurred during the update
    console.error('Error updating budget ranges:', error);
    showAlert({ type: "ERROR", message: "Failed to update budget ranges." });
  } finally {
    // Ensure the spinner is hidden once the operation is complete
    setShowUpdateSpinner(false);
  }
};

export default updateBudgetRangesService;


