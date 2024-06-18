import React, { useState } from "react";

import { FaSortUp, FaSortDown } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Word } from "../slices/dictionariesSlice";
import { DictionaryInfo } from "../slices/dictionariesSlice";
import { Link } from "react-router-dom";

type Props = {
  words: Word[];
  dictionaryInfo: DictionaryInfo;
};

const WordsTable: React.FC<Props> = ({ words, dictionaryInfo }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hiddenRows, setHiddenRows] = useState<Set<number>>(new Set());

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Word;
    direction: "ascending" | "descending";
  } | null>(null);

  const toggleRowVisibility = (index: number) => {
    setHiddenRows((prevHiddenRows) => {
      const newHiddenRows = new Set(prevHiddenRows);
      if (newHiddenRows.has(index)) {
        newHiddenRows.delete(index);
      } else {
        newHiddenRows.add(index);
      }
      return newHiddenRows;
    });
  };

  const toggleAllRowsVisibility = () => {
    if (hiddenRows.size === filteredWords.length) {
      setHiddenRows(new Set());
    } else {
      setHiddenRows(new Set(filteredWords.map((_, index) => index)));
    }
  };

  const sortedWords = React.useMemo(() => {
    const sortableWords = [...words];
    if (sortConfig !== null) {
      sortableWords.sort((a, b) => {
        if (sortConfig && sortConfig.key in a && sortConfig.key in b) {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableWords;
  }, [words, sortConfig]);

  const filteredWords = sortedWords.filter((word) => {
    return (
      word.word && word.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const requestSort = (key: keyof Word) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <p className="mb-2 text-sm">
        <Link to={`/dictionaries/`}>← Dictionaries</Link>
      </p>
      <p className="mb-1 text-2xl">
        <strong>{dictionaryInfo.name}</strong>
      </p>
      <p className="mb-1">
        {dictionaryInfo.main_language}-{dictionaryInfo.learning_language}{" "}
        dictionary
      </p>
      <div className="flex flex-grid items-left gap-x-8">
        <input
          type="text"
          placeholder="Search for a word..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-b min-w-40"
        />
        <button
          onClick={toggleAllRowsVisibility}
          className="my-2 bg-transparent text-blue-600 hover:text-blue-800"
        >
          {hiddenRows.size === filteredWords.length ? "Show all" : "Hide all"}
        </button>
      </div>
      <table className="mt-4">
        <thead>
          <tr className="border-b border-dark-blue">
            {["word", "translation", "transliteration", "comment"].map(
              (key) => (
                <th
                  key={key}
                  className={`pr-4 py-2 ${
                    sortConfig?.key === key ? "text-gold-darker-text" : ""
                  }`}
                  onClick={() => requestSort(key)}
                >
                  <div className="flex items-center justify-left">
                    <span className="flex-grow text-left">
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/_/g, " ")}
                    </span>
                    <span className="flex flex-col items-center">
                      <FaSortUp
                        className={`${
                          sortConfig?.key === key &&
                          sortConfig.direction === "ascending"
                            ? "visible"
                            : "invisible"
                        }`}
                      />
                      <FaSortDown
                        className={`${
                          sortConfig?.key === key &&
                          sortConfig.direction === "descending"
                            ? "visible"
                            : "invisible"
                        }`}
                      />
                    </span>
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {filteredWords.map((word, index) => (
            <tr key={index} className="border-b">
              <td className="pr-4 py-2">{word.word}</td>
              <td
                className={`pr-4 py-2 ${hiddenRows.has(index) ? "hidden" : ""}`}
              >
                {word.translation}
              </td>
              <td
                className={`pr-4 py-2 ${hiddenRows.has(index) ? "hidden" : ""}`}
              >
                {word.transliteration}
              </td>
              <td
                className={`pr-4 py-2 ${hiddenRows.has(index) ? "hidden" : ""}`}
              >
                {word.comment}
              </td>
              <td className="pr-4 py-2">
                <button onClick={() => toggleRowVisibility(index)}>
                  {hiddenRows.has(index) ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordsTable;
