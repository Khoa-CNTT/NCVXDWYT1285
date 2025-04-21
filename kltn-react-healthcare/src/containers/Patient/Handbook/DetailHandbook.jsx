import React from "react";
import "./DetailHandbook.scss";
import { useParams } from "react-router";
import { useState } from "react";
import HomeHeader from "../../HomePage/HomeHeader";
import { useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";

const DetailHandbook = () => {
  const params = useParams();
  const idFromParams = params.id;
  const [handbookData, setHandbookData] = useState();
  const [handTimeToRead, setTimeToRead] = useState();

  const getHandbookById = (idFromParams) => {
    axios
      .get(`http://localhost:8080/api/get-detail-handbook-by-id`, {
        params: {
          id: idFromParams,
        },
      })
      .then(function (response) {
        const dataHandbook = response.data;

        // Format date
        let dataCreatedAt = dataHandbook.data.createdAt;
        let createdAtAfterFormat = moment(dataCreatedAt).format("llll");
        setTimeToRead(createdAtAfterFormat);

        console.log(dataHandbook.data.createdAt);

        setHandbookData(dataHandbook);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getHandbookById(idFromParams);
  }, []);

  // let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(handbookData.data.timeToRead)
  // console.log('Check: ', date)

  return (
    <div className="detail-specialty-container">
      <HomeHeader />
      <div className="detail-specialty-body">
        <div className="description-specialty">
          {handbookData && !_.isEmpty(handbookData) && (
            <>
              <div className="handbook">
                <div className="clinic-name">{handbookData.data.name}</div>
                <div className="hanbook-info">
                  <span>
                    <i class="far fa-clock"></i> {handbookData.data.timeToRead}
                  </span>
                  <div></div>
                  <span>Xuất bản lúc: {handTimeToRead}</span>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: handbookData.data.descriptionHTML,
                }}
              ></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailHandbook;
