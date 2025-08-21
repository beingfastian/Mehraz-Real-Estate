import { Dashboard, ClientRoute } from "@/components";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }>
      <ClientRoute>
        <Dashboard />
      </ClientRoute>
    </Suspense>
  );
};

export default page;
