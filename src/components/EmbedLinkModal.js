import React from "react";
import { Modal, paddingModalStyles } from "@sangre-fp/ui";
// import { requestTranslation } from "@sangre-fp/i18n";
// import { InfoCircle } from "@styled-icons/boxicons-regular";
import styled from "styled-components";

const EmbedLinkModal = ({
    
    EmbedLinkModalOpen,
    EmbedLinkModalClose,
    EmbedLink
    
  }) => {
    const handleClick = (link) => {
      window.open(link);
    };

    // const viewportWidth = window.innerWidth  + "px";
    const viewportHeight = window.innerHeight ;
    const viewportHeight065 = window.innerHeight * 0.9 - 12 ;
    return (
      <Modal
        onRequestClose={EmbedLinkModalClose}
        isOpen={EmbedLinkModalOpen}
        contentLabel="radar-modal"
        ariaHideApp={false}
        style={paddingModalStyles}
      >
        <div className="confirmation-modal-content pt-4 pb-4" style={{position: "relative", height: viewportHeight}}>
            <div style={{width:"100%", height: (+viewportHeight065) }}>
                <embed 
                    type="text/html" src={EmbedLink}
                    width={"100%" } 
                    height={(viewportHeight065 -12 )} 
                    // style ={{marginBottom: '40px'}}
                    />
            </div>
            <CloseBtnWrapper>
                <button className="btn btn-primary " onClick={EmbedLinkModalClose}>GOT IT</button>
            </CloseBtnWrapper>
         
        </div>
      </Modal>
    );
  };
  
  export default EmbedLinkModal;

  const CloseBtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    bottom: 0;
    right: 12; 
    position: sticky;
    padding-right: 20px;
`;