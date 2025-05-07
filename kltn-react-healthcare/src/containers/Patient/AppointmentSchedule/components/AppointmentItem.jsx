import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import axios from 'axios';

import './AppointmentItem.scss';
import { LANGUAGES } from '../../../../utils';
import IconKham from '../../../../assets/images/icons/ic_kham.png';
import { withRouter } from 'react-router';

class AppointmentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPayment: false,
      loading: false,
      error: '',
      price: 0,
    };
  }

  handleRedirect = () => {
    if (this.props.history) {
      this.props.history.push({
        pathname: '/instruct',
        state: { data: this.props?.data },
      });
    }
  };

  handleShowPayment = async () => {
    const { data } = this.props;
    const doctorId = data?.doctorId;
    let price = 0;
    if (doctorId) {
      try {
        const res = await axios.get(`http://localhost:8080/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
        price = res.data?.data?.priceTypeData?.valueVi ? parseInt(res.data.data.priceTypeData.valueVi, 10) : 0;
      } catch (e) {
        price = 0;
      }
    }
    this.setState({ showPayment: true, error: '', price });
  };

  handleHidePayment = () => {
    this.setState({ showPayment: false, error: '' });
  };

  handleMomoPayment = async () => {
    const { data } = this.props;
    const price = this.state.price || 0;
    const bookingFee = 15000;
    const total = price + bookingFee;
    this.setState({ loading: true, error: '' });
    try {
      const res = await axios.post('http://localhost:8080/api/payments/momo', {
        amount: total,
        orderInfo: `Thanh toán khám bệnh với bác sĩ ${data?.doctorData?.lastName || ''}`,
      });
      if (res.data && res.data.payUrl) {
        window.location.href = res.data.payUrl;
      } else {
        this.setState({ error: 'Không lấy được link thanh toán MoMo', loading: false });
      }
    } catch (err) {
      this.setState({ error: 'Thanh toán thất bại', loading: false });
    }
  };

  render() {
    const { data, language } = this.props;
    const { showPayment, loading, error, price } = this.state;
    const bookingFee = 15000;
    const total = price + bookingFee;

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
          <button className="spp-button spp-momo" style={{marginTop: 8}} onClick={this.handleShowPayment}>
            Thanh toán MoMo
          </button>
          {showPayment && (
            <div className="momo-payment-modal">
              <div className="momo-payment-content">
                <h4>Hình thức thanh toán</h4>
                <div>
                  <input type="radio" checked readOnly /> Thanh toán trực tuyến
                </div>
                <div className="momo-payment-summary">
                  <div className="momo-row">
                    <span>Giá khám</span>
                    <span>{price.toLocaleString()}đ</span>
                  </div>
                  <div className="momo-row">
                    <span>Phí đặt lịch</span>
                    <span>{bookingFee.toLocaleString()}đ</span>
                  </div>
                  <div className="momo-row momo-total">
                    <span>Tổng cộng</span>
                    <span style={{color: 'red'}}>{total.toLocaleString()}đ</span>
                  </div>
                </div>
                {error && <div className="momo-error">{error}</div>}
                <div className="momo-payment-actions">
                  <button onClick={this.handleMomoPayment} disabled={loading}>
                    {loading ? 'Đang xử lý...' : 'Xác nhận'}
                  </button>
                  <button onClick={this.handleHidePayment} style={{marginLeft: 8}}>Hủy</button>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppointmentItem));
