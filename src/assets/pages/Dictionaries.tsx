import React from "react";
import TopPanel from "../components/TopPanel";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../slices/store";
import { fetchDictionariesInfo } from "../actions/dictionaries";
import { selectUserData } from "../slices/userSlice";
import DictionariesInfoTable from "../components/DictionariesInfoTable";

import { DictionaryInfo } from "../slices/dictionariesSlice";
import { User } from "../slices/userSlice";

const DictionariesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [dictionaries, setDictionaries] = useState<DictionaryInfo[]>([]);
  const userData: User = useSelector(selectUserData);

  useEffect(() => {
    handleGetDictionariesInfo();
  }, []); // Empty array ensures this runs once on mount

  // Just info wihout words
  const handleGetDictionariesInfo = () => {
    dispatch(fetchDictionariesInfo({ userId: userData?.userID })).then((response) => response.payload)
    .then((dictionariesData: DictionaryInfo[]) => {
      setDictionaries(dictionariesData);
    });
  };
  return (
    <div className="h-full flex flex-col w-screen">
      <TopPanel />
      <div className="min-h-screen-minus-header-footer">
        <div className="flex-grow flex-col flex justify-center items-center">
          <div className="w-full max-w-2xl p-4">
            <div className="h-full flex flex-col w-screen">
              <DictionariesInfoTable
                dictionaries={dictionaries}
                userDataLogin={userData?.userLogin}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DictionariesPage;
