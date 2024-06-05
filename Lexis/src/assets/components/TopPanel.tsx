import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../slices/store";
import UserInfo from './UserInfo'; // Assuming UserInfo is in the same directory
import { setUser } from "../slices/userSlice"; // Assuming userSlice defines setUser action
import { checkTokenExpiration } from "../actions/auth";



interface TopPanelProps {
  children?: React.ReactNode; // Optional child content
}

const TopPanel: React.FC<TopPanelProps> = () => {

  return (
    <div className="w-full flex flex-row h-15 bg-blue-500 justify-center items-center">
      <div className="bg-red-500 w-1/5 min-w-64">Hamburger</div>
      <div className="bg-green-500 grow">Logo</div>
      <div className="bg-yellow-500 w-1/5">
        <UserInfo />
      </div>
    </div>
  );
};

export default TopPanel;
