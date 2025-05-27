
import { DesignsClientPage, Spinner } from "@/components";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <DesignsClientPage />
      </Suspense>
    </>
  );
};

export default page;
