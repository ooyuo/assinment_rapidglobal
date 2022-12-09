import { useEffect } from "react";
import styled from "styled-components";
import "../css/ModalForProduct.css";
const Modal = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px;
  bottom: 40px;
`;

function ModalForProduct({
  props,
  modalIsOpen,
  toggleModal,
  productList,
  putTitle,
  setPutTitle,
  handleClick,
  showProductInfo,
  updateTitle,
  setProductList,
}) {
  console.log(
    "product",
    productList,
    "modal",
    modalIsOpen,
    "key",
    +modalIsOpen.id,
  );

  const updateInModal = () => {
    try {
      toggleModal();
      handleClick();
      props.updateTitle();
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  return (
    <Modal isOpen={modalIsOpen.status}>
      <div className="modal-body">
        <div className="container">
          <div className="cookiesContent" id="cookiesPopup">
            <button className="close" onClick={toggleModal}>
              ✖
            </button>
            <span className="info-title">변경할 제목을 입력해주세요.</span>
            {productList?.map((item, idx) =>
              item.id === +modalIsOpen.id ? (
                <div className="container-modal__regular-title" key={idx}>
                  <input
                    type="text"
                    name="putTitle"
                    defaultValue={item.title}
                    onChange={(e) =>
                      setPutTitle({ id: item.id, title: e.target.value })
                    }
                    className="input__text"
                  />

                  {putTitle ? (
                    <div className="container-btn">
                      <button className="accept margin" onClick={updateInModal}>
                        Save
                      </button>
                      <button className="accept" onClick={toggleModal}>
                        Close
                      </button>
                    </div>
                  ) : (
                    <div className="container-btn">
                      <button className="accept" onClick={toggleModal}>
                        Close
                      </button>
                    </div>
                  )}
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalForProduct;
