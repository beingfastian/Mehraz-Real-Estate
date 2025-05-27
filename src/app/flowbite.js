"use client"; // Important: This makes the component client-side only

import { useEffect } from "react";
import "flowbite/dist/flowbite.css"; // Import Flowbite CSS

const FlowbiteClientComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure Flowbite JS is loaded only on the client
      require("flowbite");
    }
  }, []);

  return (
    <div>
      {/* Example Flowbite component (e.g., a modal) */}
      <button
        className="btn btn-primary"
        type="button"
        data-modal-toggle="flowbiteModal">
        Open Modal
      </button>

      {/* Modal */}
      <div
        id="flowbiteModal"
        tabIndex="-1"
        aria-hidden="true"
        className="modal">
        <div className="modal-content">
          <h3>Flowbite Modal Content</h3>
        </div>
      </div>
    </div>
  );
};

export default FlowbiteClientComponent;
