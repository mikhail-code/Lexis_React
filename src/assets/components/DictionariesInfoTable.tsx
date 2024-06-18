import React, { useState } from "react";
import { DictionaryInfo } from "../slices/dictionariesSlice";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  dictionaries: DictionaryInfo[];
  userDataLogin: string | undefined;
};

const DictionariesInfoTable: React.FC<Props> = ({
  dictionaries,
  userDataLogin,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyMine, setOnlyMine] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DictionaryInfo;
    direction: "ascending" | "descending";
  } | null>(null);

  const sortedDictionaries = React.useMemo(() => {
    const sortableDictionaries = [...dictionaries];
    if (sortConfig !== null) {
      sortableDictionaries.sort((a, b) => {
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
    return sortableDictionaries;
  }, [dictionaries, sortConfig]);

  const filteredDictionaries = sortedDictionaries.filter((dictionary) => {
    return (
      dictionary.name &&
      dictionary.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!onlyMine || dictionary.owner === userDataLogin)
    );
  });

  const requestSort = (key: keyof DictionaryInfo) => {
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

  function formatHeaderName(key: string): string {
    switch (key) {
      case "name":
        return "Name";
      case "owner":
        return "Owner";
      case "learning_language":
        return "Learning Language";
      case "lastModified":
        return "Last Modified";
      default:
        return key;
    }
  }

  return (
    <div>
      <p className="mb-2 text-2xl">
        <strong>Subscribed Dictionaries</strong>
      </p>
      <div class="flex flex-grid items-left items-center gap-x-8">
        <input
          type="text"
          placeholder="Search dictionary name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-b min-w-48"
        />
        <label>
          Only mine
          <input
            type="checkbox"
            checked={onlyMine}
            onChange={(e) => setOnlyMine(e.target.checked)}
            className="ml-2 h-4 w-4 align-self-bottom"
          />
        </label>
      </div>

      <table className="mt-4">
        <thead>
          <tr className="border-b border-dark-blue">
            {["name", "owner", "learning_language", "lastModified"].map(
              (key) => (
                <th
                  key={key}
                  className={`pr-4 py-2 ${
                    sortConfig?.key === key ? "text-gold-darker-text" : ""
                  }`}
                  onClick={() => requestSort(key)}
                >
                  <div className="flex items-center justify-left hover:cursor-pointer">
                    <span className="flex-grow text-left">
                      {formatHeaderName(key)}
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
          {filteredDictionaries.map((dictionary) => (
            <tr key={dictionary.id}>
              <td className="text-left text-xl font-bold pr-14 hover:cursor-pointer hover:text-dark-gold">
                {" "}
                <Link to={`/dictionaries/${dictionary.id}`}>
                  {dictionary.name}
                </Link>
              </td>
              <td className="text-left pr-4">{dictionary.owner === userDataLogin ? "You" : dictionary.owner}</td>
              <td className="text-left pr-4">{dictionary.learning_language}</td>
              <td className="text-left pr-4">
                {dictionary.lastModified
                  ? new Date(dictionary.lastModified).toLocaleDateString()
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DictionariesInfoTable;
