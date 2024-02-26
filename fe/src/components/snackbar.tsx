import { FormTypes } from "@/utils";
import React from "react";

interface SnackbarProps {
  errors: FormTypes;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ errors, onClose }) => {
  const errorMessages = Object.values(errors).filter((error) => error !== "");

  return (
    <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4">
      <div className="max-w-sm mx-auto">
        Please correct the following errors:
        <ul>
          {errorMessages.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
      <button
        className="absolute top-0 bottom-0 right-0 px-4 py-2"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default Snackbar;
