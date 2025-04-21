import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { dateFormat, LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: '',
      rangeTime: [],
      rawDoctors: [],
      arrDoctors: [],
      showRow2: false, // Trạng thái kiểm tra hiển thị <div>
      selectedDoctorImage: null,
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //this.props.allDoctors
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
        rawDoctors: this.props.allDoctors, // Lưu dữ liệu gốc vào rawDoctors
      });
    }

    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        // data.map(item => {
        //     item.isSelected = false
        //     return item
        // })
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.firstName} ${item.lastName}`;
        let labelEn = `${item.lastName} ${item.firstName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  // handleChangeSelect = async (selectedOption) => {
  //   this.setState({ selectedDoctor: selectedOption });
  // };
  handleChangeSelect = (selectedOption) => {
    const { arrDoctors, listDoctors } = this.state;

    // Kiểm tra bác sĩ trùng id
    const isMatchingDoctor = arrDoctors.some((doctor) => doctor.id === selectedOption.value);

    // Lấy thông tin bác sĩ được chọn từ listDoctors
    const selectedDoctorData = listDoctors.find((doctor) => doctor.value === selectedOption.value);

    // Nếu `selectedDoctorData` tồn tại, tìm thông tin chi tiết trong `arrDoctors`
    const matchingDoctorDetails = isMatchingDoctor
      ? arrDoctors.find((doctor) => doctor.id === selectedOption.value)
      : null;

    this.setState({
      selectedDoctor: selectedOption,
      showRow2: isMatchingDoctor,
      selectedDoctorImage: selectedDoctorData ? selectedDoctorData.image : null,
      matchingDoctorDetails: matchingDoctorDetails, // Lưu thông tin chi tiết bác sĩ trong arrDoctors
    });
  };

  handleChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickButtonTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error('Invalid selected doctor!');
      return;
    }
    if (!currentDate) {
      toast.error('Invalid date!');
      return;
    }

    let formatedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error('Invalid selected time!');
      }
    }

    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate,
    });

    if (res && res.errCode === 0) {
      toast.success('Schedule saved successfully!');
    } else {
      toast.error('Schedule saved Failed!');
      console.log('error saveBulkScheduleDoctor: ', res);
    }
  };

  render() {
    let { rangeTime, matchingDoctorDetails } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let imageBase64 = '';
    if (matchingDoctorDetails?.image) {
      imageBase64 = new Buffer(matchingDoctorDetails?.image, 'base64').toString('binary');
    }
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                className="form-control"
                onChange={this.handleChangeDatePicker}
                minDate={yesterday}
                value={this.state.currentDate[0]}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? 'btn btn-schedule btn-save-schedule active'
                          : 'btn btn-schedule btn-save-schedule'
                      }
                      key={index}
                      onClick={() => this.handleClickButtonTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button className="btn btn-primary" onClick={() => this.handleSaveSchedule()}>
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
          {/* Hiển thị <div> khi giá trị trùng */}
          {this?.state?.showRow2 && (
            <div class="user-wrapper">
              <div class="user-card">
                <div class="user-card-img">
                  <img src={imageBase64} alt="" />
                </div>
                <div class="user-card-info">
                  <h2>
                    {matchingDoctorDetails?.firstName} {matchingDoctorDetails?.lastName}
                  </h2>
                  <p>
                    <span>Email:</span> {matchingDoctorDetails?.email}
                  </p>
                  <p>
                    <span>Địa chỉ:</span> {matchingDoctorDetails?.address}
                  </p>
                  <p>
                    <span>Vị trí:</span>{' '}
                    {language === LANGUAGES.VI
                      ? matchingDoctorDetails?.positionData?.valueVi
                      : matchingDoctorDetails?.positionData?.valueEn}
                  </p>
                  <p>
                    <span>Số điện thoại:</span> {matchingDoctorDetails?.phonenumber}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
