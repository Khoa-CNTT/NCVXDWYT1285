import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'


class About extends Component {
    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Tổng quan về các trung tâm HealthCare toàn cầu
                </div>
                <div className='section-about-content'>
                    <div className='about-content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/DublqkOSBBA" 
                        title="US Healthcare System Explained" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen></iframe>
                    </div>
                    <div className='about-content-right'>

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
