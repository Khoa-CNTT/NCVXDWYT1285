import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
// import { KeyCodeUtils, LanguageUtils } from "../../../utils";
// import { LanguageUtils } from "../../../utils";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import "../../Auth/Login.scss";
import userIcon from "../../../assets/images/user.svg";
import passIcon from "../../../assets/images/pass.svg";
// import passIcon from '../../../assets/images/pass.svg'
import "./ChangePass.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Formik } from "formik";

class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).add(0, "days").startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      username: "",
      password: "",
      loginError: "",
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  handleChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedyConfirm = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
      medicine: dataChild.medicine,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send Remedy Succeed!");
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Send Remedy failed!");
      console.log("Send Remedy failed: ", res);
    }
    this.closeRemedyModal();
  };

  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;
    const { username, password, loginError } = this.state;
    const { lang } = this.props;
    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner
        text="Loading..."
      >
        <div className="login-background">
          <div className="login-container">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={""}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <div className="login-content">
                  <div className="col-12 text-login">Thay đổi mật khẩu</div>
                  <div className="col-12 form-group login-input">
                    <lable>Mật Khẩu Củ</lable>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.username}
                      onChange={(event) => this.handleOnChangeUsername(event)}
                      name="email"
                      onBlur={handleBlur}
                    />
                    {errors.email && (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    )}
                  </div>
                  <div className="col-12 form-group login-input">
                    <lable>Mật Khẩu Mới</lable>
                    <div className="custom-input-password">
                      <input
                        className="form-control"
                        type={this.state.isShowPassowrd ? "text" : "password"}
                        value={this.state.password}
                        onChange={(event) => this.handleOnChangePassword(event)}
                        onKeyDown={(e) => this.handleKeyDown(e)}
                        onBlur={handleBlur}
                      />
                      {errors.password && (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 form-group login-input">
                    <lable>Nhập Lại Mật Khẩu Mới</lable>
                    <div className="custom-input-password">
                      <input
                        className="form-control"
                        type={this.state.isShowPassowrd ? "text" : "password"}
                        value={this.state.password}
                        onChange={(event) => this.handleOnChangePassword(event)}
                        onKeyDown={(e) => this.handleKeyDown(e)}
                        onBlur={handleBlur}
                      />
                      {errors.password && (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-12" style={{ color: "red" }}>
                    {this.state.errMessage}
                  </div>
                  <div className="col-12">
                    <button
                      onClick={() => {
                        this.handldLogin();
                      }}
                      className="btn-login"
                    >
                      Xác Nhận
                    </button>
                  </div>
                  <div className="col-12">
                    <button
                      onClick={() => {
                        this.handldLogin();
                      }}
                      className="btn-login"
                    >
                      Trở Về
                    </button>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
        <RemedyModal
          isOpenRemedyModal={isOpenRemedyModal}
          dataModal={dataModal}
          closeRemedyModal={this.closeRemedyModal}
          sendRemedyConfirm={this.sendRemedyConfirm}
        />
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);
