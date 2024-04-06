"use client";
import { useState } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-10 cursor-pointer">
      <button onClick={openModal}>Open Modal</button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
            <p>This is the modal content.</p>
            <div className="flex justify-end mt-4">
              <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
