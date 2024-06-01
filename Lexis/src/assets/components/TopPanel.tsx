import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserInfo from './UserInfo'; // Assuming UserInfo is in the same directory
import { setUser } from "../slices/userSlice"; // Assuming userSlice defines setUser action

interface TopPanelProps {
  children?: React.ReactNode; // Optional child content
}

const TopPanel: React.FC<TopPanelProps> = ({ children }) => {
  const user = useSelector(state => state.user); // Access user data from Redux store
  const dispatch = useDispatch();

  const isLoggedIn = user?.token !== undefined; // Check for presence of token

  const handleLogin = (newUser: { login?: string } | null) => {
    dispatch(setUser(newUser)); // Dispatch action to update user state
  };

  return (
    <div className="w-full flex flex-row h-15 bg-blue-500 justify-center items-center">
      <div className="bg-red-500 w-1/5 min-w-64">Hamburger</div>
      <div className="bg-green-500 grow">Logo</div>
      <div className="bg-yellow-500 w-1/5">
        <UserInfo user={isLoggedIn ? user : null} onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default TopPanel;
