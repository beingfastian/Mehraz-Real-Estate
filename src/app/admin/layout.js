import { AdminHeader, AlertContainer } from "@/components";
const AdminLayout = ({ children }) => {
  return (
    <main className="h-screen overflow-x-hidden ">
      <AdminHeader />
      <AlertContainer />
      {children}
    </main>
  );
};

export default AdminLayout;
