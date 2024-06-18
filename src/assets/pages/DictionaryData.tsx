import React from "react";
import TopPanel from "../components/TopPanel";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../slices/store";
import { fetchDictionaryData } from "../actions/dictionaries";
import { selectUserData } from "../slices/userSlice";
import DictionaryWordsTable from "../components/DictionaryWordsTable";

import { Dictionary } from "../slices/dictionariesSlice";
import { useParams } from "react-router-dom";

interface DictionaryPageProps {
    dictionaryId?: string; // Optional type for potential absence of dictionaryId
  }

const DictionaryDataPage: React.FC<DictionaryPageProps> = () => {
  const [dictionary, setDictionary] = useState<Dictionary>();
  const { dictionaryId } = useParams<DictionaryPageProps>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleGetDictionaryData = async () => {
      if (dictionaryId) {
        try {
          const response = await dispatch(
            fetchDictionaryData({ dictionaryId })
          );
          setDictionary(response.payload);
        } catch (error) {
          console.error("Error fetching dictionary:", error);
        }
      }
    };

    handleGetDictionaryData();
  }, [dispatch, dictionaryId]);

  //   const handleGetDictionariesInfo = () => {
  //     dispatch(fetchDictionariesInfo({ userId: userData?.userID })).then((response) => response.payload)
  //     .then((dictionariesData: DictionaryInfo[]) => {
  //       setDictionaries(dictionariesData);
  //     });
  //   };
  return (
    <div className="h-full flex flex-col w-screen">
      <TopPanel />
      <div className="min-h-screen-minus-header-footer">
        <div className="flex-grow flex-col flex justify-center items-center">
          <div className="w-full max-w-2xl p-4">
            <div className="h-full flex flex-col w-screen">
              <div>
                {dictionary ? (
                  <div>{dictionary && <DictionaryWordsTable words={dictionary.words} dictionaryInfo={dictionary} />}</div>
                ) : (
                  <p>
                    {dictionaryId
                      ? "Loading dictionary..." // Indicate loading when ID is present
                      : "No specific dictionary selected." // Inform user when no ID is provided
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DictionaryDataPage;
