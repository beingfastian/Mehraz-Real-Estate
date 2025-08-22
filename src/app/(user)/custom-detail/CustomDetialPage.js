import CustomDetail from "@/components/CustomDetail";
import getStylesFromDB from "@/Firebase/admin-side/roles-analytics-cities/styles/getStylesFromFirebase";

const CustomDetailPage = async () => {
  let styles = [];
  let error = null;

  try {
    styles = await getStylesFromDB(["id", "name", "budget", "image"]);
  } catch (e) {
    error = "Failed to fetch styles. Please refresh the page.";
  }

  return <CustomDetail styles={styles} error={error} />;
};

export default CustomDetailPage;
