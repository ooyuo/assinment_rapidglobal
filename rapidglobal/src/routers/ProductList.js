import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import "../css/ProductList.css";
import Modal from "react-modal";
import ModalForProduct from "./ModalForProduct";

function ProductList() {
  const location = useLocation();
  const { access_token } = location.state.clientToken;

  const [productList, setProductList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [putTitle, setPutTitle] = useState();
  const [modalIsOpen, setModalIsOpen] = useState();
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const { isLoading, refetch: getProductList } = useQuery(
    "productList",
    async () => {
      return await axios.get(
        `http://ec2-52-79-228-35.ap-northeast-2.compute.amazonaws.com:8002/api/v1/product/list`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
    },
    {
      enabled: false,
      onSuccess: (res) => {
        setProductList(res.data.list);
      },
      onError: (err) => {
        console.log(JSON.stringify(err.response?.data || err));
      },
    },
  );
  const { isLoading: isUpdatingTitle, mutate: updateTitle } = useMutation(
    async () => {
      return await axios.put(
        `http://ec2-52-79-228-35.ap-northeast-2.compute.amazonaws.com:8002/api/v1/product/${putTitle.id}`,
        {
          title: putTitle.title,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
    },
    {
      onSuccess: (res) => {
        getProductList();
        setPutTitle("");
      },
      onError: (err) => {
        console.log(err.response?.data || err);
      },
    },
  );

  useEffect(() => {
    try {
      getProductList();
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }, [getProductList]);

  const handleClick = () => {
    if (putTitle.id) {
      try {
        updateTitle();
        toggleIsEdit();
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    }
  };

  const showProductInfo = (e) => {
    setModalIsOpen({ status: true, id: +e.currentTarget.id });
  };
  console.log("product", productList);
  return (
    <>
      <div className="container-productList">
        {productList?.map((item, idx) => (
          <div className="container-productList_title" key={idx}>
            <div className="container-product">
              <div className="container-productInfo">
                <img
                  src={item.selectedThumbnailUrl}
                  width="150px"
                  className="border-image"
                />
                <div className="container__large-title">
                  <div className="container__regular-title">
                    <input
                      type="text"
                      name="putTitle"
                      defaultValue={item.title}
                      onChange={(e) =>
                        setPutTitle({ id: item.id, title: e.target.value })
                      }
                      className="input__text"
                    />

                    {putTitle?.id == item.id && !modalIsOpen ? (
                      <button
                        className="button-editTitle btn--primary"
                        onClick={handleClick}
                      >
                        수정
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <span className="title-translatedTitle">{item.rawTitle}</span>
                </div>
              </div>
            </div>
            <div
              width="100px"
              className="svg"
              id={item.id}
              key={item.id}
              onClick={showProductInfo}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="arrow"
              >
                <path
                  d="M8 21a.997.997 0 00.707-.293l8-8a.999.999 0 000-1.414l-8-8a.999.999 0 10-1.414 1.414L14.586 12l-7.293 7.293A.999.999 0 008 21z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        ))}

        {modalIsOpen ? (
          <ModalForProduct
            modalIsOpen={modalIsOpen}
            toggleModal={toggleModal}
            productList={productList}
            handleClick={handleClick}
            putTitle={putTitle}
            setPutTitle={setPutTitle}
            showProductInfo={showProductInfo}
            updateTitle={updateTitle}
            setProductList={setProductList}
          />
        ) : null}
      </div>
    </>
  );
}

export default ProductList;
