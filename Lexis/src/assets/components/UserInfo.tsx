import React, { useState } from "react";
import { useSelector } from "react-redux"; // Assuming you use Redux for user state
import { HiOutlineUserCircle } from "react-icons/hi";
import ModalContainer from "./ModalContainer"; // Import ModalContainer
import { RootState } from "../slices/store";

const UserInfo: React.FC = () => {
  const selectUser = (state: RootState) => state.user;
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center">
      <HiOutlineUserCircle />
      {!user?.login && ( // Check if user is not logged in
        <span className="cursor-pointer underline" onClick={handleOpenModal}>
          Not Logged In
        </span>
      )}
      {user?.login && <span className="">{user.login}</span>}
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
