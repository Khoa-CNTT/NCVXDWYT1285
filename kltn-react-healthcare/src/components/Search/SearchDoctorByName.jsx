import React, { useState } from "react";
import axios from "axios";
import "./Search.scss";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import SearchModal from "../SearchModal/SearchModal";

const SearchDoctorByName = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const history = useHistory();

  const handleOnchangeSearchInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleClickSearch = async () => {
    handleGetDoctorByName();
  };

  const handleGetDoctorByName = () => {
    const removeSpace = inputValue.replace(/\s/g, "");
    axios
      .get(`http://localhost:8080/api/search`, {
        params: {
          lastName: removeSpace,
        },
      })
      .then(function (response) {
        const dataDoctor = response.data;
        if (dataDoctor.errCode === 1) {
          toast.warning(`${dataDoctor.errMessage}`);
        } else if (dataDoctor.errCode === -2) {
          toast.warning(`${dataDoctor.errMessage}`);
        } else {
          // const arrDoctor = []
          // arrDoctor.push(dataDoctor.data)
          setData(...dataDoctor.data);
          setIsOpenModal(true);
          setInputValue("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const handleNavigate = (id) => {
  //     history.push(`/detail-doctor/${id}`)
  // }

  // useEffect(() => {
  //     setData(null)
  // }, [])

  return (
    <>
      <div className="search">
        <div>
          <input
            value={inputValue}
            placeholder="Tìm kiếm bác sĩ..."
            type="text"
            onChange={(e) => handleOnchangeSearchInput(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClickSearch();
              }
            }}
          />
          <i onClick={handleClickSearch} className="fas fa-search" />
        </div>
        {/* {data !== null ? (
                    <div className='resultContainer'>
                        <p>
                            <span onClick={handleNavigate(data.id)}>{data.firstName} {data.lastName}</span>
                        </p>
                    </div>
                ) : null} */}
      </div>
      <SearchModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        doctorData={data}
      />
    </>
  );
};

export default SearchDoctorByName;
