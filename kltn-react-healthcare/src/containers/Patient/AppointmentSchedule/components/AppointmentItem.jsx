import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import './AppointmentItem.scss';
import { LANGUAGES } from '../../../../utils';
import IconKham from '../../../../assets/images/icons/ic_kham.png';
import { withRouter } from 'react-router';

class AppointmentItem extends Component {
  constructor(props) {
    super(props);
  }

  handleRedirect = () => {
    if (this.props.history) {
      this.props.history.push({
        pathname: '/instruct',
        state: { data: this.props?.data },
      });
    }
  };

  render() {
    const { data, language } = this.props;

    return (
      <div className="spp-sub-item">
        <div className="spp-item-left">
          <div className="spp-thumnail">
            <div className="spp-image">
              <img src={IconKham} alt="khám bệnh" />
            </div>
          </div>
          <span className="spp-sub-text">
            <FormattedMessage id="patient.appointment-schedule.examination" />
          </span>
          <div className="spp-time-list">
            <div className="spp-time">
              <i class="fas fa-solid fa-clock"></i>
              <span>
                {language === LANGUAGES.VI ? data?.timeTypeDataPatient?.valueVi : data?.timeTypeDataPatient?.valueEn}
              </span>
            </div>
            <div className="spp-time">
              <i class="fas fa-solid fa-calendar"></i>
              <span>{moment(+data?.date).format('DD/MM/YYYY')}</span>
            </div>
          </div>
        </div>
        <div className="spp-item-right">
          <div className="spp-text bold">
            <span>
              <FormattedMessage id="patient.appointment-schedule.patient" />
              :&nbsp;
              <span>
                {data?.patientData?.firstName} {data?.patientData?.lastName}
              </span>
            </span>
          </div>
          <div className="spp-text spp-text-doctor">
            <span>
              <FormattedMessage id="patient.appointment-schedule.doctor" />
              :&nbsp;
              <span>
                {data?.doctorData?.firstName} {data?.doctorData?.lastName}
              </span>
            </span>
          </div>
          <div className="spp-text">
            <span>
              <FormattedMessage id="patient.appointment-schedule.place" />
              :&nbsp;
              <span>Bệnh viện Hoàn Mỹ</span>
            </span>
          </div>
          <button className="spp-button" onClick={this.handleRedirect}>
            <FormattedMessage id="patient.appointment-schedule.booked" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppointmentItem));
