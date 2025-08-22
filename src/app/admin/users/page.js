import UsersClientPage from "@/components/admin-side/UsersClientPage";
import getUsersFromFirestore from "@/Firebase/admin-side/users/getUsersFromFirestore";

const UsersAdmin = async () => {
  let users = null;

  let isErrorOccurredWhileFetching = {
    users: false,
  };

  try {
    // Fetch all users
    users = await getUsersFromFirestore();
  } catch (error) {
    console.error("Error fetching users:", error);
    isErrorOccurredWhileFetching.users = true;
  }

  return (
    <>
      <section className="px-8 flex flex-col sm:px-4">
        <UsersClientPage
          users={users}
          isErrorOccurredWhileFetching={isErrorOccurredWhileFetching}
        />
      </section>
    </>
  );
};

export default UsersAdmin;
