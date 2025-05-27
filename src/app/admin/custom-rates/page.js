"use client";
import Image from "next/image";
import {
  Dropdown,
  Table,
  Td,
  Th,
  AdminTableContainer,
  Button,
  Spinner,
  Modal
} from "@/components/";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";
import { AlertContext } from "@/context/AlertContext";
import { useContext, useState } from "react";
import { FaDownload } from "react-icons/fa6";

const CustomRatesPage = () => {
  // Sample template data
  const materials = [
    {
      id: "1",
      fix: true,
      category: "cat1", 
      type: "Luxury Marble",
      area: "150 sqft",
      range: "$300-400",
      location: "New York",
      description: "Premium Italian marble with elegant veining patterns",
      referenceImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
      floors: ["Ground", "First"],
      budgets: ["Premium", "Luxury"],
      style: "Modern Classic",
      status: "Pending",
      offer: "$350",
      off: "12%",
      familyUnit: "sqft"
    },
    {
      id: "2",
      fix: false,
      category: "cat2",
      type: "Hardwood Flooring",
      area: "200 sqft", 
      range: "$250-350",
      location: "Los Angeles",
      description: "Brazilian walnut hardwood with natural finish",
      referenceImage: "https://images.unsplash.com/photo-1594940208655-b1e3bb590b8f",
      floors: ["All"],
      budgets: ["Premium"],
      style: "Contemporary", 
      status: "Given",
      offer: "$300",
      off: "15%",
      familyUnit: "sqft"
    },
    {
      id: "3",
      fix: true,
      category: "cat1",
      type: "Designer Tiles",
      area: "180 sqft",
      range: "$200-300",
      location: "Miami",
      description: "Handcrafted ceramic tiles with geometric patterns",
      referenceImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
      floors: ["Ground", "First"],
      budgets: ["Economy", "Premium"],
      style: "Mediterranean",
      status: "Pending",
      offer: "$250",
      off: "10%",
      familyUnit: "sqft"
    },
    {
      id: "4",
      fix: false,
      category: "cat2",
      type: "Glass Panels",
      area: "120 sqft",
      range: "$400-500",
      location: "Seattle",
      description: "Tempered glass panels with frosted finish",
      referenceImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      floors: ["All"],
      budgets: ["Luxury"],
      style: "Modern",
      status: "Given",
      offer: "$450",
      off: "8%",
      familyUnit: "sqft"
    },
    {
      id: "5",
      fix: true,
      category: "cat1",
      type: "Natural Stone",
      area: "160 sqft",
      range: "$350-450",
      location: "Chicago",
      description: "Polished granite with natural patterns",
      referenceImage: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      floors: ["Ground"],
      budgets: ["Premium", "Luxury"],
      style: "Classic",
      status: "Pending",
      offer: "$400",
      off: "11%",
      familyUnit: "sqft"
    }
  ];

  const [modalMetadata, setModalMetadata] = useState({
    type: null,
    action: null
  });

  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showAlert } = useContext(AlertContext);

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const editMaterialClickHandler = e => {
    setModalMetadata({
      type: "CUSTOM_RATES",
      action: "EDIT",
    });
    toggleModal();
    const materialId = e.currentTarget.dataset.materialId;
    const material = materials.find(material => material.id === materialId);
    setCurrentMaterial(material);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Material:", currentMaterial);
    showAlert({
      type: "success",
      message: "Material updated successfully!"
    });
    toggleModal();
  };

  const deleteMaterialClickHandler = e => {
    setModalMetadata({
      type: "CUSTOM_RATES",
      action: "DELETE",
    });
    toggleModal();
    setItemToDelete({
      name: "custom rate",
      id: e.currentTarget.dataset.materialId,
    });
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting material with ID:", itemToDelete.id);
    showAlert({
      type: "success", 
      message: "Material deleted successfully!"
    });
    toggleModal();
  };

  return (
    <div className="p-6 lg:p-4 sm:p-2">
      <h1 className="text-2xl font-bold mb-6 text-center lg:text-xl">Custom Rates</h1>
      <AdminTableContainer className="w-full flex flex-col gap-y-2">
        {materials ? (
          materials.length > 0 ? (
            <>
              <Table border={false} className="h-full overflow-y-auto">
                <thead className="bg-accent-1-base text-sm">
                  <tr>
                    <Th position="beginning">fix</Th>
                    <Th>category</Th>
                    <Th>Type</Th>
                    <Th>Area</Th>
                    <Th>Range</Th>
                    <Th>Location</Th>
                    <Th>description</Th>
                    <Th>reference image</Th>
                    <Th>floors</Th>
                    <Th>budgets</Th>
                    <Th>style</Th>
                    <Th>status</Th>
                    <Th>Offer</Th>
                    <Th>%OFF</Th>
                    <Th position="end">family unit</Th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {materials?.map((material, index) => (
                    <tr key={index}>
                      <Td
                        align="center"
                        position="beginning"
                        isLastRow={index === materials.length - 1}>
                        {material.fix ? (
                          <FaCheckCircle size={14} className="text-green-500" />
                        ) : (
                          <FaMinusCircle size={14} />
                        )}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.category || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.type || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.area || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.range || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.location || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.description || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.referenceImage ? (
                          <div className="flex items-center gap-2">
                            <span>{material.referenceImage}</span>
                            <a 
                              style={{outline: "none"}}
                              href={material.referenceImage}
                              download={material.referenceImage.split('/').pop()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-accent-2-base"
                              title="Download image"
                              onClick={(e) => {
                                e.preventDefault();
                                const link = document.createElement('a');
                                link.href = material.referenceImage;
                                link.download = material.referenceImage.split('/').pop();
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                            >
                              <FaDownload size={14} />
                            </a>
                          </div>
                        ) : "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.floors || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.budgets || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.style || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1} className={`${material.status === "Pending" ? "text-yellow-500" : material.status === "Given" ? "text-green-500" : "text-red-500"}`}>
                        {material.status || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.offer || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.off || "-"}
                      </Td>
                      <Td isLastRow={index === materials.length - 1}>
                        {material.familyUnit || "-"}
                      </Td>
                      <Td
                        position="end"
                        align="center"
                        isLastRow={index === materials.length - 1}>
                        <Dropdown
                          className="w-fit"
                          contentClassName="w-max flex items-center bg-white border-2 border-accent-1-base px-1 rounded-lg shadow-dropdown absolute top-1/2 -translate-y-1/2 right-0 translate-x-full"
                          buttonClassName="hover:bg-accent-1-extra-light p-1.5 rounded-full lg:p-2"
                          triggerContent={
                            <Image
                              src={ellipsisIcon}
                              alt="ellipsis"
                              className="min-w-4 w-4 lg:min-w-5 lg:w-5"
                            />
                          }>
                          <button
                            title="Edit material"
                            data-material-id={material.id}
                            onClick={editMaterialClickHandler}
                            className="hover:bg-accent-1-extra-light p-2 rounded-full">
                            <Image
                              src={editIcon}
                              alt="edit"
                              className="w-4 lg:w-5"
                            />
                          </button>
                          <button
                            title="Delete material"
                            data-material-id={material.id}
                            onClick={deleteMaterialClickHandler}
                            className="hover:bg-accent-1-extra-light p-2 rounded-full">
                            <Image
                              src={deleteIcon}
                              alt="delete"
                              className="w-4 lg:w-5"
                            />
                          </button>
                        </Dropdown>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Edit Modal */}
              {isModalOpen && modalMetadata.action === "EDIT" && currentMaterial && (
                <Modal onClose={toggleModal} className="max-w-2xl w-full border-2 border-accent-1-base rounded-lg">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Edit Material</h2>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      {/* Enabled Fields */}
                      <div className="flex items-center gap-2">
                        <label className="font-medium">Fix:</label>
                        <input 
                          type="checkbox"
                          checked={currentMaterial.fix}
                          onChange={e => setCurrentMaterial({...currentMaterial, fix: e.target.checked})}
                          className="h-5 w-5"
                        />
                      </div>

                      <div>
                        <label className="font-medium block mb-1">Offer:</label>
                        <input 
                          type="text"
                          value={currentMaterial.offer}
                          onChange={e => setCurrentMaterial({...currentMaterial, offer: e.target.value})}
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      <div>
                        <label className="font-medium block mb-1">%OFF:</label>
                        <input 
                          type="text"
                          value={currentMaterial.off}
                          onChange={e => setCurrentMaterial({...currentMaterial, off: e.target.value})}
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      <div>
                        <label className="font-medium block mb-1">Status:</label>
                        <select 
                          value={currentMaterial.status}
                          onChange={e => setCurrentMaterial({...currentMaterial, status: e.target.value})}
                          className="w-full p-2 border rounded"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Given">Given</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>

                      {/* Disabled Fields */}
                      <div className="space-y-2 opacity-50">
                        <div>
                          <label className="font-medium block">Category:</label>
                          <input type="text" value={currentMaterial.category} disabled className="w-full p-2 border rounded bg-gray-100" />
                        </div>
                        <div>
                          <label className="font-medium block">Type:</label>
                          <input type="text" value={currentMaterial.type} disabled className="w-full p-2 border rounded bg-gray-100" />
                        </div>
                        {/* Add other disabled fields similarly */}
                      </div>

                      <div className="flex justify-end gap-4 mt-6">
                        <Button text="Cancel" onClick={toggleModal} variant="secondary" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">Cancel</Button>
                        <Button text="Save Changes" type="submit" variant="primary" className="bg-accent-2-base hover:bg-accent-2-dark text-white px-4 py-2 rounded">Save Changes</Button>
                      </div>
                    </form>
                  </div>
                </Modal>
              )}

              {/* Delete Modal */}
              {isModalOpen && modalMetadata.action === "DELETE" && itemToDelete && (
                <Modal onClose={toggleModal} className="max-w-md w-full border-2 border-accent-1-base rounded-lg">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                    <p className="mb-6">Are you sure you want to delete material with ID: {itemToDelete.id}?</p>
                    <div className="flex justify-end gap-4">
                      <Button text="Cancel" onClick={toggleModal} variant="secondary" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">Cancel</Button>
                      <Button text="Delete" onClick={handleDeleteConfirm} variant="danger" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</Button>
                    </div>
                  </div>
                </Modal>
              )}
            </>
          ) : (
            <div className="flex-1 font-medium flex items-center justify-center">
              <p>No custom rates added yet.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading custom rates..." />
          </div>
        )}
        
      </AdminTableContainer>
    </div>
  );
};

export default CustomRatesPage;
