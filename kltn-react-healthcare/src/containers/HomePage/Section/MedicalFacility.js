import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
import Slider from "react-slick";
import "./MedicalFacility.scss";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    console.log("check res clinic: ", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate() {}

  handleViewDetaiClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  render() {
    let { dataClinics } = this.state;

    return (
      <div>
        <div
          id="section-clinic"
          className="section-share section-medical-facility"
        >
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.medical-facility" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="homepage.learn-more" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataClinics &&
                  dataClinics.length > 0 &&
                  dataClinics.map((item, index) => {
                    return (
                      <div
                        onClick={() => this.handleViewDetaiClinic(item)}
                        className="section-customize"
                        key={index}
                      >
                        <div
                          style={{ backgroundImage: `url(${item.image})` }}
                          className="bg-image section-medical-facility"
                        />
                        <div className="clinic-name">{item.name}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
