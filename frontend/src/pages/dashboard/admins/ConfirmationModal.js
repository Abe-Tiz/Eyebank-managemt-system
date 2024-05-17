 
import React, { useState } from "react";
import DynamicIcon from '../../../components/DynamicIcon';

const ConfirmationModal = ({ id, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirmDelete = () => {
    handleDelete(id);
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal} className="btn text-red-400 px-4 py-2 rounded">
        <DynamicIcon library="md" iconName="MdDelete" className="text-2xl" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
