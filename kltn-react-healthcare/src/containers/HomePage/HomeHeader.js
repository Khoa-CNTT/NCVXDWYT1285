import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Homeheader.scss";
import logo1 from "../../assets/logo2.png";
import khamchuyenkhoa from "../../assets/images/icons/phongkhamchuyenkhoa.png";
import khamnhakhoa from "../../assets/images/icons/khamnhakhoa.png";
import khamtongquat from "../../assets/images/icons/khamtongquat.png";
import khamtuxa from "../../assets/images/icons/khamtuxa.png";
import suckhoetinhthan from "../../assets/images/icons/suckhoetinhthan.png";
import dichvuxetnghiem from "../../assets/images/icons/dichvuxetnghiem.png";
import appointment from "../../assets/images/appointment.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { withRouter } from "react-router";

import { changeLanguageApp } from "../../store/actions/appActions";
import SearchDoctorByName from "../../components/Search/SearchDoctorByName";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false, // Trạng thái hiển thị thanh nav
    };
  }
  toggleNav = () => {
    this.setState((prevState) => ({
      showNav: !prevState.showNav, // Đảo trạng thái hiển thị
    }));
  };
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    // fire redux event(actions)
  };

  returnToHomePage = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  handleViewSupportPage = () => {
    if (this.props.history) {
      this.props.history.push(`/support`);
    }
  };

  render() {
    let language = this.props.language;

    // let { handleButtonClick } = this.props

    // console.log('check props ref: ', handleButtonClick)

    // handleButtonClick = () => {
    //     if (this.props.onClick) {
    //         this.props.onClick();
    //     }
    // };

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars" onClick={this.toggleNav}></i>
              <img
                src={logo1}
                className="header-logo"
                alt=""
                onClick={() => this.returnToHomePage()}
              ></img>
            </div>
            <div className="center-content">
              <a href="#section-specialty" className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </a>
              <a href="#section-clinic" className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </a>
              <a href="#section-doctor" className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor1" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </a>
              <a href="#section-handbook" className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.handbook" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.handbook-des" />
                </div>
              </a>
              {/* <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.medical-package" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.generalHC" />
                </div>
              </div> */}
            </div>
            <div className="right-content">
              <Link to="/appoinment-schedule" className="appoinment-schedule">
                <img src={appointment} alt="" />
                <span>
                  <FormattedMessage id="homeheader.appointment-schedule" />
                </span>
              </Link>
              <div
                className="support"
                onClick={() => this.handleViewSupportPage()}
              >
                <i className="fa fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div className="flag">
                <div
                  className={
                    language === LANGUAGES.VI
                      ? "language-vi active"
                      : "language-vi"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                    VN
                  </span>
                </div>
                <div
                  className={
                    language === LANGUAGES.EN
                      ? "language-en active"
                      : "language-en"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                    EN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Thanh nav dọc */}
        {this.state.showNav && (
          <div className="vertical-nav">
            <Link to="/login" className="nav-button">
              Login dành cho Admin
            </Link>
            <Link to="/login" className="nav-button">
              Login dành cho Bác Sĩ
            </Link>
          </div>
        )}
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title-1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title-2">
                <FormattedMessage id="banner.title2" />
              </div>
              <SearchDoctorByName />
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <img src={khamchuyenkhoa} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.bannerp1" />
                    </b>
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <img src={khamtuxa} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.bannerp2" />
                    </b>
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <img src={khamtongquat} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.bannerp3" />
                    </b>
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <img src={dichvuxetnghiem} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.bannerp4" />
                    </b>
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <img src={suckhoetinhthan} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.bannerp5" />
                    </b>
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <img src={khamnhakhoa} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.bannerp6" />
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
