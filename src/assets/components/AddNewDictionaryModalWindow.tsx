import { FC } from "react";
import { SVGProps, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";
import { RootState, AppDispatch } from "../slices/store";
import { selectUserData } from "../slices/userSlice";

import { addNewDictionary } from "../actions/dictionaries";

const XIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const AddNewDictionaryModalWindow: FC<{
    onClose: () => void;
    onUpdateDictionaries: () => void; // Accept the new prop
  }> = ({ onClose, onUpdateDictionaries }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(selectUserData);
  const [dictionaryData, setDictionaryData] = useState({
    name: "",
    tags: [],
    main_language: "English", //TO DO
    learning_language: "Hebrew", //TO DO
    words: [],
    owner: userData.userID,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDictionaryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await dispatch(addNewDictionary(dictionaryData));
      onUpdateDictionaries(); // Call the passed function to update dictionaries
      onClose(); // Close the modal on successful creation
    } catch (error) {
      console.error("Error creating new dictionary:", error);
    }
  };

  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950 relative">
        <button
          className="absolute top-4 right-4 rounded-full focus:outline-none"
          onClick={onClose}
        >
          <XIcon className="w-5 h-5" />
          <span className="sr-only">Close</span>
        </button>
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Add New Dictionary</h2>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                className="bg-gray-100"
                id="name"
                name="name"
                placeholder="Dictionary Name"
                required
                value={dictionaryData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                className="bg-gray-100"
                id="tags"
                name="tags"
                placeholder="Tags"
                value={dictionaryData.tags.join(", ")}
                onChange={(event) => {
                  const newTags = event.target.value
                    .split(",")
                    .map((tag) => tag.trim());
                  setDictionaryData((prevData) => ({
                    ...prevData,
                    tags: newTags,
                  }));
                }}
              />
            </div>
            {/* <div className="space-y-2 flex flex-col">
            <label htmlFor="main_language">Main Language</label>
            <input
              className="bg-gray-100"
              id="main_language"
              name="main_language"
              placeholder="Main Language"
              value={dictionaryData.main_language}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="learning_language">Learning Language</label>
            <input
              className="bg-gray-100"
              id="learning_language"
              name="learning_language"
              placeholder="Learning Language"
              value={dictionaryData.learning_language}
              onChange={handleInputChange}
            />
          </div> */}
            <button className="w-full border border-yellow-500" type="submit">
              Create dictionary
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewDictionaryModalWindow;
