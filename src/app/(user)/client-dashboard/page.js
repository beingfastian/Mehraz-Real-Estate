import { ClientDashboard } from "@/components";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }>
      <ClientDashboard />
    </Suspense>
  );
};

export default page;
