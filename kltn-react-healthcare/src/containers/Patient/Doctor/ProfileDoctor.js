import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import localization from 'moment/locale/vi'
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        console.log('check dataaaaaaaa: ', data)
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
                console.log('cehck result: ', result)
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            // let data = this.getInfoDoctor(this.props.doctorId)
            // this.setState({
            //     dataProfile: data
            // })
        }
    }

    renderTimeBooking = (dataScheduleTimeModal) => {
        let { language } = this.props
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let time = language === LANGUAGES.VI ? dataScheduleTimeModal.timeTypeData.valueVi : dataScheduleTimeModal.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataScheduleTimeModal.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataScheduleTimeModal.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id='patient.booking-modal.price-booking' /></div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { dataProfile } = this.state
        let { language, isShowDescriptionDoctor, dataScheduleTimeModal,
            isShowLinkDetail, isShowPrice, doctorId
        } = this.props
        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`
        }
        console.log('check name: ', nameEn, nameVi)
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown
                                        && dataProfile.Markdown.description
                                        &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>}
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataScheduleTimeModal)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true && <div className='view-detail-doctor'>
                    <Link to={`/detail-doctor/${doctorId}`}><span><FormattedMessage id='patient.specialty-modal.learn-more' /></span></Link>
                </div>}
                {isShowPrice === true &&
                    <div className='price'>
                        <span><FormattedMessage id='patient.booking-modal.price' />: </span>
                        {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI
                            &&
                            <NumberFormat
                                value={dataProfile.Doctor_Info.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            />
                        }
                        {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.EN &&

                            <NumberFormat
                                value={dataProfile.Doctor_Info.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        }
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
