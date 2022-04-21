import React from "react";
import { requestTranslation } from "@sangre-fp/i18n";
// import Modal from "react-modal";
import { Btn, BtnGroup, ModalContent } from "./styles";
import { Modal, paddingModalStyles } from "@sangre-fp/ui";

const ConfirmationModal = ({
  clearRatings,
  confirmationModal,
  confirmationModalClose,
}) => {
  return (
    <Modal onRequestClose={confirmationModalClose} isOpen={confirmationModal} style={paddingModalStyles} ariaHideApp={false}>
      <div className="confirmation-modal-content pt-4 pb-4">
        <ModalContent>{requestTranslation("deleteAllRatesNote")}</ModalContent>
        <BtnGroup>
          <Btn
            onClick={confirmationModalClose}
            className="btn btn-lg btn-plain-primary"
          >
            {requestTranslation("cancel").toUpperCase()}
          </Btn>
          <Btn className="btn btn-lg btn-primary" onClick={clearRatings}>
            {requestTranslation("delete").toUpperCase()}
          </Btn>
        </BtnGroup>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
