import React from "react";
import { Modal, paddingModalStyles } from "@sangre-fp/ui";
// import { requestTranslation } from "@sangre-fp/i18n";
import { InfoCircle } from "@styled-icons/boxicons-regular";
import styled from "styled-components";
import EmbedLinkModal from "../EmbedLinkModal";
import './InformationModal.css'
import InfoModal from "./InfoModal";

const InformationModal = ({
  InfoModalHeader,
  InfoModalDescription,
  InfoModalDescription2,
  InfoModalDescription3,
  InfoModalDescription4,
  InfoModalDescription5,
  InfoModalDescription6,
  InfoModalDescriptionb,
  InfoModalDescriptionb2,
  InfoModalDescriptionb3,
  InfoModalDescriptionb4,
  InfoModalNote,
  InfoModalNote2,
  InfoModalNote3,
  InfoModalNote4,
  InfoModalNote4b,
  InfoModalNote4c,
  InfoModalOpen,
  InfoModalClose,
  LearnMoreLink,
  GuideLink,
  radar
}) => {
  const [openEmbedLinkModalGuideLink, setOpenEmbedLinkModalGuideLink ] = React.useState(false)
  const [openEmbedLinkModalLearnMoreLink, setOpenEmbedLinkModalLearnMoreLink] = React.useState(false)
  
  // const handleOpenGuideLinkModal = (link) => {
  //   setOpenEmbedLinkModalGuideLink(true)
  //   // window.open(link);
  // };
  // const handleOpenLearnMoreLinkModal = (link) => {
  //   setOpenEmbedLinkModalLearnMoreLink(true)
  //   // window.open(link);
  // };
  return (
    <Modal
      onRequestClose={InfoModalClose}
      isOpen={InfoModalOpen}
      contentLabel="radar-modal"
      ariaHideApp={false}
      style={paddingModalStyles}
    >
      <div className="confirmation-modal-content pt-4 pb-4">
        <div
          className="modal-form-section modal-form-header"
          style={{ marginLeft: "10px", paddingBottom: '21px' }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <InfoModal />
            <h3 style={{ marginLeft: "20px", marginBottom: "0" }}>
              {InfoModalHeader}
            </h3>
          </div>
          <p className="mt-4">
            {InfoModalNote}
          </p>
          {
            InfoModalNote2 &&(
              <p className="mt-4">
                {InfoModalNote2}
              </p>
            )
          }
            <InformationUl>
              {InfoModalDescription && <InformationLi>{InfoModalDescription}</InformationLi>}
              {InfoModalDescription2 && <InformationLi>{InfoModalDescription2}</InformationLi>}
              {InfoModalDescription3 && <InformationLi>{InfoModalDescription3}</InformationLi>}
              {InfoModalDescription4 && <InformationLi>{InfoModalDescription4}</InformationLi>}
              {InfoModalDescription5 && <InformationLi>{InfoModalDescription5}</InformationLi>}
              {InfoModalDescription6 && <InformationLi>{InfoModalDescription6}</InformationLi>}
            </InformationUl>

            {
              InfoModalNote3 &&(
                <p className="mt-4">
                  {InfoModalNote3}
                </p>
              )
            }

            <InformationUl>
              {InfoModalDescriptionb && <InformationLi>{InfoModalDescriptionb}</InformationLi>}
              {InfoModalDescriptionb2 && <InformationLi>{InfoModalDescriptionb2}</InformationLi>}
              {InfoModalDescriptionb3 && <InformationLi>{InfoModalDescriptionb3}</InformationLi>}
              {InfoModalDescriptionb4 && <InformationLi>{InfoModalDescriptionb4}</InformationLi>}
            </InformationUl>

            {
              InfoModalNote4 &&(
                <p className="mt-4">
                    <span className="mt-4">
                      {InfoModalNote4}
                    </span>
                    <span className="mt-4" style={{ fontWeight: 'bold'}}>
                      {InfoModalNote4b}
                    </span>
                    <span className="mt-4">
                      {InfoModalNote4c}
                  </span>
                  </p>
              )
            }
          {/* <div style={{ marginTop: "48px", display: 'flex', flexDirection:'column', width: '60%' }}>
            <p>{requestTranslation('LearnMoreFromHUB')}</p>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <button handleOpenLearnMoreLinkModal
                onClick={() => handleOpenLearnMoreLinkModal(LearnMoreLink)}
                className="btn btn-sm btn-outline-secondary"
              >
                {LearnMoreBtn}
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                style={{marginTop: '17px'}}
                onClick={() => handleOpenGuideLinkModal(GuideLink)}
              >
                {GuideBtn}
              </button>
            </div>
          </div> */}
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button className='btn btn-lg btn-primary' onClick={InfoModalClose}>{(radar?.radarLanguage === "en" ? 'GOT IT' : 'OK')}</button>
          </div>
        </div>
      </div>
      <EmbedLinkModal 
        EmbedLinkModalOpen= {openEmbedLinkModalGuideLink}
        EmbedLinkModalClose= {() => setOpenEmbedLinkModalGuideLink(false)}
        EmbedLink={GuideLink}
      />
      <EmbedLinkModal 
        EmbedLinkModalOpen= {openEmbedLinkModalLearnMoreLink}
        EmbedLinkModalClose= {() => setOpenEmbedLinkModalLearnMoreLink(false)}
        EmbedLink={LearnMoreLink}
      />
    </Modal>
  );
};

export default InformationModal;

// const InformationIcon = styled(InfoModal)`
//   background-color: transparent;
//   width: 45px;
//   height: 45px;
// `;
const InformationUl = styled.ul`
  line-height: 2
`;
const InformationLi = styled.li`
  line-height: 1.4
  margin-top: 8px;
  margin-bottom: 8px;
`;
