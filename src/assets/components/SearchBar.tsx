import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../slices/store";

import { fetchTranslation } from "../actions/translate";
import {
  addWordToDictionary,
  deleteWordFromDictionary,
  checkWordInDictionaries,
} from "../actions/dictionaries";
import { Word, DictionaryInfoItem } from "../slices/dictionariesSlice";
import { selectUserData } from "../slices/userSlice";

import { selectToken, selectIsExpired } from "../slices/authSlice";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { Description, Field, Input } from "@headlessui/react";
import clsx from "clsx";

import AddNewDictionaryModalWindow from "./AddNewDictionaryModalWindow";
import LoginModalWindow from "./LoginModalWindow";

export default function SearchBar() {
  const [text, setText] = useState("");
  const [dictionaries, setDictionaries] = useState<DictionaryInfoItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNewDictionaryModalOpen, setIsNewDictionaryModalOpen] =
    useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const isExpired = useSelector(selectIsExpired);
  const userData = useSelector(selectUserData);
  const translatedText = useSelector(
    (state: RootState) => state.translation.translatedText
  );

  const [sortConfig, setSortConfig] = useState<{
    key: keyof DictionaryInfoItem;
    direction: "ascending" | "descending";
  }>({ key: "lastModified", direction: "descending" });

  // Effect to fetch dictionaries when user is authenticated
  useEffect(() => {
    if (token && !isExpired && userData.userID) {
      handleGetDictionaries();
    }
  }, [token, isExpired, userData.userID]);

  const handleTranslate = () => {
    dispatch(
      fetchTranslation({ text, sourceLanguage: "en", targetLanguage: "he" })
    ).then(() => setShowResults(true));
    if (userData.userID) {
      handleGetDictionaries();
    }
  };

  const handleGetDictionaries = () => {
    if (!userData.userID) {
      console.error("User ID is missing.");
      return;
    }

    dispatch(checkWordInDictionaries({ userId: userData.userID, word: text }))
      .then((response) => {
        const dictionariesData = response.payload as DictionaryInfoItem[];
        setDictionaries(dictionariesData);
      })
      .catch((error) => {
        console.error("Error fetching dictionaries:", error.message);
      });
  };

  const handleDeleteFromDictionary = async (
    dictionaryId: string,
    wordToDelete: string
  ) => {
    await dispatch(
      deleteWordFromDictionary({ dictionaryId, word: wordToDelete })
    );
    handleGetDictionaries();
  };

  const handleAddToDictionary = async (dictionaryId: string) => {
    const wordToAdd = { word: text, translation: translatedText };
    await dispatch(addWordToDictionary({ dictionaryId, word: wordToAdd }));
    handleGetDictionaries();
  };

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenNewDictionaryModal = () => setIsNewDictionaryModalOpen(true);
  const handleCloseNewDictionaryModal = () =>
    setIsNewDictionaryModalOpen(false);

  // Sorting
  const itemsPerPage = 10;
  const requestSort = (key: keyof DictionaryInfoItem) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const sortedDictionaries = [...dictionaries].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedDictionaries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(sortedDictionaries.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center justify-center text-center text-2xl mt-32">
      {isLoginModalOpen && (
        <LoginModalWindow
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onUpdateDictionaries={handleGetDictionaries} // Pass the function as a prop
        />
      )}

      {isNewDictionaryModalOpen && (
        <AddNewDictionaryModalWindow
          isOpen={isNewDictionaryModalOpen}
          onClose={() => setIsNewDictionaryModalOpen(false)}
          onUpdateDictionaries={handleGetDictionaries} // Pass the function as a prop
        />
      )}

      <div className="w-full px-1 min-w-96">
        <Field>
          <div className="flex flex-grid items-center justify-center text-center ">
            <Input
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setShowResults(false);
              }}
              className={clsx(
                "border-b border-dark-blue block w-full bg-white/5 text-gold-darker-text",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleTranslate();
                }
              }}
            />
            <MagnifyingGlassIcon
              className="h-5 w-5 text-dark-blue"
              aria-hidden="true"
              onClick={handleTranslate}
            />
          </div>

          <Description className="text-dark-blue text-lg">
            {showResults
              ? "Add word to chosen dictionary or start new search"
              : "Write down phrase and press enter.."}
          </Description>
        </Field>
      </div>
      {showResults && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-left w-full max-w-4xl">
          <div className="break-words">
            <strong>Phrase:</strong> {text}
          </div>
          <div className="break-words">
            <strong>Translation:</strong> {translatedText}
          </div>
          {!token || isExpired ? (
            <div className="break-words">
              <span
                className="cursor-pointer underline"
                onClick={handleOpenLoginModal}
              >
                Login with your account to save phrase to your dictionary!
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-left justify-left text-left">
              <p className="mb-2">Add to dictionary (✓)</p>
              <div className="flex flex-col items-left justify-left text-left">
                <div className="flex items-center mb-2 text-sm">
                  <span className="mr-4">Sort by:</span>
                  {["Name", "Last Modified", "Size"].map((header, index) => {
                    const key = [
                      "dictionaryName",
                      "lastModified",
                      "wordsAmount",
                    ][index];
                    return (
                      <div
                        key={header}
                        onClick={() =>
                          requestSort(key as keyof DictionaryInfoItem)
                        }
                        className={`mr-4 cursor-pointer flex items-center justify-left ${
                          sortConfig.key === key
                            ? "text-gold-darker-text font-bold"
                            : ""
                        }`}
                      >
                        <span className="flex-grow text-left">{header}</span>
                        <span className="flex flex-col items-center">
                          <FaSortUp
                            className={`text-xs ${
                              sortConfig?.key === key &&
                              sortConfig.direction === "ascending"
                                ? "visible"
                                : "invisible"
                            }`}
                          />
                          <FaSortDown
                            className={`text-xs ${
                              sortConfig?.key === key &&
                              sortConfig.direction === "descending"
                                ? "visible"
                                : "invisible"
                            }`}
                          />
                        </span>
                      </div>
                    );
                  })}
                </div>
                {currentItems.length > 0 ? (
                  currentItems.map((dictionary) => (
                    <label
                      key={dictionary.dictionaryId}
                      className="flex items-center mb-1"
                    >
                      <input
                        type="checkbox"
                        checked={dictionary.exists}
                        onChange={() => {
                          if (!dictionary.exists) {
                            handleAddToDictionary(dictionary.dictionaryId);
                          } else {
                            handleDeleteFromDictionary(
                              dictionary.dictionaryId,
                              text
                            );
                          }
                        }}
                        className="h-4 w-4 mr-2"
                      />
                      <span className="break-words">
                        {dictionary.dictionaryName} ({dictionary.wordsAmount})
                      </span>
                    </label>
                  ))
                ) : (
                  <p>No dictionaries found...</p>
                )}
                <div className="flex justify-between mt-4">
                  <span
                    onClick={() => paginate(currentPage - 1)}
                    className={`cursor-pointer ${
                      currentPage === 1 ? "text-gray-400" : "text-blue-500"
                    }`}
                    style={{
                      pointerEvents: currentPage === 1 ? "none" : "auto",
                    }}
                  >
                    Previous
                  </span>
                  <span
                    onClick={() => paginate(currentPage + 1)}
                    className={`cursor-pointer ${
                      currentPage === totalPages
                        ? "text-gray-400"
                        : "text-blue-500"
                    }`}
                    style={{
                      pointerEvents:
                        currentPage === totalPages ? "none" : "auto",
                    }}
                  >
                    Next
                  </span>
                </div>
                <span
                  className="cursor-pointer underline mt-2 text-lg"
                  onClick={handleOpenNewDictionaryModal}
                >
                  + Add new dictionary
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {isLoginModalOpen && (
        <LoginModalWindow
          isOpen={isLoginModalOpen}
          onClose={handleCloseLoginModal}
          onUpdateDictionaries={handleGetDictionaries}
        />
      )}

      {isNewDictionaryModalOpen && (
        <AddNewDictionaryModalWindow
          isOpen={isNewDictionaryModalOpen}
          onClose={handleCloseNewDictionaryModal}
          onUpdateDictionaries={handleGetDictionaries}
        />
      )}
    </div>
  );
}
