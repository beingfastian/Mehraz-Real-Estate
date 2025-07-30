import { X } from "lucide-react";

export default function HomeProgramPopup({ onClose }) {
  const selectedCategory = "ALL"; // Add useState to manage dynamic selection if needed
  const categories = ["ALL", "GROUND FLOOR", "FIRST FLOOR", "SECOND FLOOR"];
  const cardCount = 6;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white bg-opacity-90 w-[35%] max-h-[90vh] rounded-2xl p-4 relative overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 rounded-full p-1 hover:bg-gray-200">
          <X size={18} />
        </button>

        {/* Filter Tabs */}
        <div className="flex justify-between items-center gap-2 px-2 pb-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`text-xs px-4 py-2 rounded-full font-medium ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-white border border-black text-black"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t my-2 border-gray-300" />

        {/* Cards */}
        <div className="flex flex-col gap-4 mt-4">
          {[...Array(cardCount)].map((_, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex justify-between items-center mb-2 px-4 rounded-full bg-white border shadow">
                <h3 className="font-bold text-gray-800 text-lg">BEDROOM</h3>
                <span className="font-bold text-gray-800 text-lg">5</span>
              </div>
              <div className="text-xs text-gray-600 flex flex-col gap-1 px-8 justify-center">
                <div className="flex justify-between">
                  <span>MAIN BEDROOM</span>
                  <span>12 BY 6 FT</span>
                </div>
                {/* Divider */}
                <div className="border-t my-2 border-gray-300" />
                <div className="flex justify-between">
                  <span>MAIN BEDROOM</span>
                  <span>12 BY 6 FT</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
