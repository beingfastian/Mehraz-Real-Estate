// src/app/(user)/chat/page.js
import { Suspense } from "react";
import ChatPageContent from "./ChatPageContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}
