import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi";
import ModalContainer from "./ModalContainer";
import { selectToken, selectIsExpired } from "../slices/authSlice";
import { selectUserData, selectUserLogin } from "../slices/userSlice"; // Import the selector

const UserInfo: React.FC = () => {
  const token = useSelector(selectToken);
  const isExpired = useSelector(selectIsExpired);
  const userLogin = useSelector(selectUserLogin);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center">
      <HiOutlineUserCircle />
      {!token || isExpired ? (
        <span className="cursor-pointer underline" onClick={handleOpenModal}>
          Not Logged In
        </span>
      ) : (
        <span className="">User: {userLogin ? userLogin : "Loading..."}</span> // Use userLogin from userData
      )}
      {isModalOpen && (
        <ModalContainer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserInfo;
