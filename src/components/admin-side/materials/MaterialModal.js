"use client";
import {
  AdminCheckbox,
  AdminInputBox,
  AdminModal,
  AdminMultiSelect2,
  AdminSelect,
  ListInput,
} from "@/components";
import { useEffect, useState } from "react";

const MaterialModal = ({
  addNewMaterialHandler,
  currentMaterial,
  materialCategories,
  currentMaterialInputHandler,
  editMaterialHandler,
  modalMetadata,
  cities,
}) => {
  const [previewSrc, setPreviewSrc] = useState(null);

  // Clean preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewSrc && previewSrc.startsWith("blob:")) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, []);

  // Handle preview updates
  useEffect(() => {
    if (currentMaterial?.image1) {
      // Clean old blob
      if (previewSrc && previewSrc.startsWith("blob:")) {
        URL.revokeObjectURL(previewSrc);
      }

      if (currentMaterial.image1 instanceof File) {
        const imageUrl = URL.createObjectURL(currentMaterial.image1);
        setPreviewSrc(imageUrl);
      } else if (typeof currentMaterial.image1 === "string") {
        setPreviewSrc(currentMaterial.image1); // already a URL
      }
    } else {
      // Reset preview
      if (previewSrc && previewSrc.startsWith("blob:")) {
        URL.revokeObjectURL(previewSrc);
      }
      setPreviewSrc(null);
    }
  }, [currentMaterial?.image1]);

  return (
    <AdminModal
      heading={
        modalMetadata.action === "ADD" ? "Add material" : "Edit material"
      }
      buttonText={
        modalMetadata.action === "ADD" ? "Add material" : "Update material"
      }
      onButtonClick={
        modalMetadata.action === "ADD"
          ? addNewMaterialHandler
          : editMaterialHandler
      }
      className="grid grid-cols-3 gap-4 sm:grid-cols-1"
    >
      {/* LEFT SIDE FORM */}
      <div className="col-span-2 grid grid-cols-2 gap-4 sm:gap-2 sm:col-span-1">
        <AdminInputBox
          label="Enter material name"
          value={currentMaterial.name || ""}
          inputHandler={currentMaterialInputHandler}
          idHtmlFor="name"
          name="name"
          required
          maxLength={40}
        />
        <AdminInputBox
          label="Enter vendor name"
          value={currentMaterial.vendor || ""}
          inputHandler={currentMaterialInputHandler}
          idHtmlFor="vendor"
          name="vendor"
          required
          maxLength={40}
        />
        <AdminInputBox
          label="Enter rate"
          value={currentMaterial.rate || ""}
          inputHandler={currentMaterialInputHandler}
          idHtmlFor="rate"
          name="rate"
          type="number"
          required
          max={99999}
        />
        <AdminMultiSelect2
          title="Cities"
          message="Select cities"
          inputHandler={currentMaterialInputHandler}
          name="cities"
          options={cities.map((city) => ({
            label: city.name,
            value: city.id,
          }))}
          selectedOptions={currentMaterial.cities || []}
        />
        <AdminInputBox
          label="Enter description"
          value={currentMaterial.description || ""}
          inputHandler={currentMaterialInputHandler}
          idHtmlFor="description"
          name="description"
          type="textarea"
          required
          maxLength={150}
        />
        <ListInput
          label="Enter specs"
          values={currentMaterial.specs || []}
          inputHandler={currentMaterialInputHandler}
          name="specs"
          required
          maxLength={20}
        />
        <AdminSelect
          label="Select category"
          idHtmlFor="category"
          inputHandler={currentMaterialInputHandler}
          name="category"
          value={currentMaterial.category || ""}
          required
          options={materialCategories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
        <AdminInputBox
          label="Material ordered as"
          value={currentMaterial.orderedAs || ""}
          inputHandler={currentMaterialInputHandler}
          idHtmlFor="orderedAs"
          name="orderedAs"
          required
          maxLength={15}
        />
        <AdminCheckbox
          label="Is material fixed?"
          idHtmlFor="isFixed"
          name="isFixed"
          checked={currentMaterial.isFixed || false}
          inputHandler={currentMaterialInputHandler}
        />
      </div>

      {/* RIGHT SIDE - IMAGE UPLOAD */}
      <div className="flex flex-col gap-4">
<input
  type="file"
  id="image1"
  name="image1"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      currentMaterialInputHandler("image1", file); // ✅ match AdminInputBox style
    }
  }}
  required={modalMetadata.action === "ADD"}
/>


        {/* Image Preview */}
        <div className="flex flex-col justify-center min-h-[200px]">
          {previewSrc ? (
            <div className="flex flex-col">
              <p className="text-accent-1-dark mb-2 font-medium">
                Material Image Preview
              </p>
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                <img
                  src={previewSrc}
                  alt="Material image preview"
                  className="w-full h-auto max-h-64 object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-48 p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl bg-gray-50">
              <div>
                <p className="text-lg mb-2">📷</p>
                <p>Material image will be displayed here</p>
                <p className="text-sm text-gray-500 mt-1">
                  Click "Choose File" above to upload
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminModal>
  );
};

export default MaterialModal;
