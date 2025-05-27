import { UserProtectedRoute } from "@/components";
import BuyPropertyPage from "@/components/user-side/buy-property/Buy-PropertyPage";
import React from "react";

const page = () => {
  return (
    <UserProtectedRoute>
      <BuyPropertyPage />
    </UserProtectedRoute>
  );
};

export default page;
