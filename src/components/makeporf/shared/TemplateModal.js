import React from "react";
import Modal from "react-modal";

function TemplateModal() {
  Modal.setAppElement("#root");
  return (
    <>
      <Modal
      //   ariaHideApp={false}
      //   isOpen={modalIsOpen}
      //   onRequestClose={closeModal}
      //   style={customStyles}
      //   contentLabel="Example Modal"
      ></Modal>
    </>
  );
}

export default TemplateModal;
