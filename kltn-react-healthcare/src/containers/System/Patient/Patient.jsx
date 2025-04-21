import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import moment from "moment";

import ModalConfirm from "./ModalConfirm";
import { LANGUAGES } from "../../../utils";
import {
  getAllPatientForManage,
  updateStatusPatient,
} from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import "./Patient.scss";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).add(0, "days").startOf("day").valueOf(),
      dataPatient: [],
      isOpenModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  getDataPatient = async () => {
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForManage({
      statusId: "S1",
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
      id: item.id,
      statusId: "S2",
    };
    this.setState({
      isOpenModal: true,
      dataModal: data,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      dataModal: {},
    });
  };

  sendConfirm = async () => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await updateStatusPatient({
      ...dataModal,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Xác nhận bệnh nhân đã đặt lịch thành công!");
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Xác nhận bệnh nhân đã đặt lịch thất bại!");
    }
    this.closeModal();
  };

  render() {
    let { dataPatient, isOpenModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="mp-title">Quản lý bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>Chọn ngày khám</label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleChangeDatePicker}
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th>Actions</th>
                    </tr>
                    {dataPatient && dataPatient?.length > 0 ? (
                      dataPatient?.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;
                        let gender =
                          language === LANGUAGES.VI
                            ? item?.patientData?.genderData?.valueVi
                            : item?.patientData?.genderData?.valueEn;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item?.patientData?.firstName}</td>
                            <td>{item?.patientData?.address}</td>
                            <td>{gender}</td>
                            <td>
                              <button
                                onClick={() => this.handleBtnConfirm(item)}
                                className="mp-btn-confirm"
                              >
                                Xác nhận
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td style={{ textAlign: "center" }} colSpan="6">
                          No data...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ModalConfirm
            isOpenModal={isOpenModal}
            dataModal={dataModal}
            closeModal={this.closeModal}
            sendConfirm={this.sendConfirm}
          />
        </LoadingOverlay>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
