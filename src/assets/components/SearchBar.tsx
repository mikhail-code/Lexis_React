import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../slices/store";

import { fetchTranslation } from "../actions/translate";
import {
  addWordToDictionary,
  deleteWordFromDictionary,
  checkWordInDictionaries,
} from "../actions/dictionaries";
import { Word } from "../slices/dictionariesSlice";
import { selectUserData } from "../slices/userSlice";

import { selectToken, selectIsExpired } from "../slices/authSlice";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Description, Field, Input } from "@headlessui/react";
import clsx from "clsx";

import AddNewDictionaryModalWindow from "./AddNewDictionaryModalWindow";
import LoginModalWindow from "./LoginModalWindow";

interface DictionaryInfo {
  dictionaryName: string;
  dictionaryId: string;
  exists: boolean;
}

export default function SearchBar() {
  const [text, setText] = useState("");
  const [dictionaries, setDictionaries] = useState<DictionaryInfo[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNewDictionaryModalOpen, setIsNewDictionaryModalOpen] =
    useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const isExpired = useSelector(selectIsExpired);
  const userData = useSelector(selectUserData);
  const translatedText = useSelector(
    (state: RootState) => state.translation.translatedText
  );

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
        const dictionariesData = response.payload as DictionaryInfo[];
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
        <div className="grid grid-cols-3 gap-4 mt-4 text-left">
          <div>
            <strong>Phrase:</strong> {text}
          </div>
          <div>
            <strong>Translation:</strong> {translatedText}
          </div>
          {!token || isExpired ? (
            <span
              className="cursor-pointer underline ml-1"
              onClick={handleOpenLoginModal}
            >
              Login with your account to save phrase to your dictionary!
            </span>
          ) : (
            <div className="flex flex-col items-left justify-left text-left pl-8">
              <p className="">Add to dictionary (✓)</p>
              <div className="flex flex-col items-left justify-left text-left">
                {dictionaries.length > 0 ? (
                  dictionaries.map((dictionary) => (
                    <label key={dictionary.dictionaryName}>
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
                      {dictionary.dictionaryName}
                    </label>
                  ))
                ) : (
                  <p>No dictionaries found...</p>
                )}
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
