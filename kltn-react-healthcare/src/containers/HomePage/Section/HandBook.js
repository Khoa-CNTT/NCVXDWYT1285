import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import Slider from "react-slick";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./HandBook.scss";
import { Link } from "react-router-dom";

const HandBook = ({ settings }) => {
  const [allHandbooks, setAllHandbooks] = useState();

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const getAllHandBook = () => {
    axios
      .get("http://localhost:8080/api/get-all-handbook")
      .then(function (response) {
        const data = response.data;
        if (data.errCode === 0) {
          setAllHandbooks(data.data);
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllHandBook();
  }, []);

  console.log("check handbook: ", allHandbooks);

  return (
    <div id="section-handbook" className="section-share section-handbook">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">Cẩm nang</span>
          <button className="btn-section">XEM THÊM</button>
        </div>
        <div className="section-body">
          <Slider {...settings}>
            {allHandbooks &&
              allHandbooks.length > 0 &&
              allHandbooks.map((handbook, index) => (
                <Link
                  to={`/detail-handbook/${handbook.id}`}
                  className="link-handbook section-customize"
                  key={index}
                >
                  <div
                    style={{ backgroundImage: `url(${handbook.image})` }}
                    className="bg-image section-medical-facility"
                  />
                  <div className="handbook-name clinic-name">
                    {handbook.name}
                  </div>
                </Link>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HandBook;
