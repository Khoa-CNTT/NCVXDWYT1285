import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  render() {
    let allDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <div>
        <div
          id="section-doctor"
          className="section-share section-outstanding-doctor"
        >
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.outstanding-doctor" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="homepage.learn-more" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {allDoctors &&
                  allDoctors.length > 0 &&
                  allDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                    return (
                      <div
                        onClick={() => this.handleViewDetailDoctor(item)}
                        key={index}
                        className="section-customize"
                      >
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          />
                        </div>
                        <div
                          className="position text-center "
                          style={{ fontWeight: 600 }}
                        >
                          <div>Bệnh viện Hoàn Mỹ</div>
                          <div className="">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
