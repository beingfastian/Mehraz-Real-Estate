import Image from "next/image";
import {
  Dropdown,
  H2,
  Table,
  Td,
  Th,
  AdminTableContainer,
  Button,
  Spinner,
} from "@/components/";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";

const FreeProjectMaterialsSection = ({
  materials,
  setModalMetadata,
  toggleModal,
  setCurrentMaterial,
  setItemToDelete,
}) => {
  const addMaterialClickHandler = () => {
    setModalMetadata({
      type: "MATERIALS",
      action: "ADD",
    });
    toggleModal();
  };

  const editMaterialClickHandler = e => {
    setModalMetadata({
      type: "MATERIALS",
      action: "EDIT",
    });
    toggleModal();
    const materialId = e.currentTarget.dataset.materialId;
    const material = materials.find(material => material.id === materialId);
    setCurrentMaterial(material);
  };
  const deleteMaterialClickHandler = e => {
    setModalMetadata({
      type: "MATERIALS",
      action: "DELETE",
    });
    toggleModal();
    setItemToDelete({
      name: "material",
      id: e.currentTarget.dataset.materialId,
    });
  };
  return (
    <>
      <AdminTableContainer className="w-full flex flex-col gap-y-2">
        <H2 text="Materials" />
        {materials ? (
          materials.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead className="text-sm">
                <tr>
                  <Th position="beginning">name</Th>
                  <Th>vendor</Th>
                  <Th position="end">rate</Th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {materials?.map((material, index) => (
                  <tr key={index}>
                    <Td
                      position="beginning"
                      isLastRow={index === materials.length - 1}>
                      {material.name}
                    </Td>
                    <Td isLastRow={index === materials.length - 1}>
                      {material.vendor}
                    </Td>
                    <Td isLastRow={index === materials.length - 1}>
                      {material.rate}
                    </Td>
                    <Td
                      position="end"
                      align="center"
                      isLastRow={index === materials.length - 1}>
                      <Dropdown
                        className="w-fit"
                        contentClassName={
                          "w-max flex items-center bg-white border-2 border-accent-1-base px-1 rounded-lg shadow-dropdown absolute top-1/2 -translate-y-1/2 -left-1 -translate-x-full"
                        }
                        buttonClassName="hover:bg-accent-1-extra-light p-1.5 rounded-full lg:p-2"
                        triggerContent={
                          <>
                            <Image
                              src={ellipsisIcon}
                              alt="ellipsis"
                              className="min-w-4 w-4 lg:min-w-5 lg:w-5"
                            />
                          </>
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
          ) : (
            <div className="flex-1 font-medium flex items-center justify-center">
              <p>No materials added yet.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading materials..." />
          </div>
        )}
        <Button
          text="add material"
          className="mr-auto ml-4"
          type="button"
          size="xs"
          onClick={addMaterialClickHandler}
        />
      </AdminTableContainer>
    </>
  );
};

export default FreeProjectMaterialsSection;
