import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss'
import { LANGUAGES } from '../../../utils';
import { getExtraInfoDoctorById } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format'

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {}
        }
    }

    async componentDidMount() {
        let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent)
        if (res && res.errCode === 0) {
            this.setState({
                extraInfo: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }

        }
    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        let { isShowDetailInfo, extraInfo } = this.state
        let { language } = this.props
        console.log('check state: ', this.state.extraInfo)
        return (
            <div className='doctor-extra-info-container'>

                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id='patient.extra-info-doctor.text-address' /></div>
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className='detail-address'>{extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfo === false &&
                        <div className='content-down-flex'>
                            <div className='title-price'><FormattedMessage id='patient.extra-info-doctor.price' />:</div>
                            <div className='price'>
                                {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI
                                    &&
                                    <NumberFormat
                                        value={extraInfo.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                }
                                {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN
                                    &&
                                    <NumberFormat
                                        value={extraInfo.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />
                                }
                            </div>

                            <span className='span-read-more' onClick={() => this.showHideDetailInfo(true)}><FormattedMessage id='patient.extra-info-doctor.detail' /></span>
                        </div>
                    }
                    {isShowDetailInfo === true &&
                        <div className='content-down-down'>
                            <div className='title-price'><FormattedMessage id='patient.extra-info-doctor.price' />:</div>
                            <div className='title-price-body'>
                                <div className='detail-info'>
                                    <span className='left'><FormattedMessage id='patient.extra-info-doctor.price' /></span>
                                    <span className='right'>
                                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat
                                                value={extraInfo.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN
                                            &&
                                            <NumberFormat
                                                value={extraInfo.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>{extraInfo && extraInfo.note ? extraInfo.note : ''}</div>
                                <div className='price'><FormattedMessage id='patient.extra-info-doctor.payment' />
                                    <span className='price-payment'>
                                        {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.VI
                                            ? extraInfo.paymentTypeData.valueVi : ''
                                        }
                                        {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.EN
                                            ? extraInfo.paymentTypeData.valueEn : ''
                                        }
                                    </span>
                                </div>
                                <div><span className='price-title' onClick={() => this.showHideDetailInfo(false)}><FormattedMessage id='patient.extra-info-doctor.hide-detail' /></span></div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
