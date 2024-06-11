import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { usePopper } from "react-popper";
import ModalContainer from "./ModalContainer";
import { selectToken, selectIsExpired } from "../slices/authSlice";
import { selectUserData, selectUserLogin } from "../slices/userSlice";
import { HiOutlineUserCircle, HiOutlineX } from "react-icons/hi";

const UserInfo: React.FC = () => {
  const token = useSelector(selectToken);
  const isExpired = useSelector(selectIsExpired);
  const userLogin = useSelector(selectUserLogin);
  const userData = useSelector(selectUserData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopper, setShowPopper] = useState(false);
  const referenceRef = useRef(null);
  const popperRef = useRef(null);
  const { styles, attributes } = usePopper(referenceRef.current, popperRef.current, {
    placement: 'bottom',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    setShowPopper(!showPopper); // Toggle the popper on click
  };

  const handleClose = () => {
    setShowPopper(false); // Close the popper
  };

  return (
    <div className="flex items-center">
      <div ref={referenceRef} onClick={handleClick}>
        <HiOutlineUserCircle />
      </div>
      {!token || isExpired ? (
        <span className="cursor-pointer underline" onClick={handleOpenModal}>
          Not Logged In
        </span>
      ) : (
        <span className="">User: {userLogin ? userLogin : "Loading..."}</span>
      )}
      {isModalOpen && (
        <ModalContainer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {showPopper && (
        <div ref={popperRef} style={{...styles.popper, backgroundColor: 'white'}} {...attributes.popper}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div>User Name: {userData?.name}</div>
              <div>Email: {userData?.email}</div>
            </div>
            <HiOutlineX onClick={handleClose} style={{ cursor: 'pointer' }} /> {/* Add close button */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;