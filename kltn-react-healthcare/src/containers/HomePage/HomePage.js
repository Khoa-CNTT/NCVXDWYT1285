
import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from '../HomePage/Section/Specialty';
import MedicalFacility from '../HomePage/Section/MedicalFacility';
import OutStandingDoctor from '../HomePage/Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

class HomePage extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.myRef = React.createRef();
    //     this.handleButtonClick = this.handleButtonClick.bind(this);
    // }

    // handleButtonClick() {
    //     this.myRef.current.scrollIntoView({ behavior: "smooth" });
    // }

    render() {

        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
        }
        return (
            <div>
                <HomeHeader
                    isShowBanner={true} />
                <Specialty
                    settings={settings} />
                <MedicalFacility
                    settings={settings} />
                <OutStandingDoctor
                    settings={settings} />
                <HandBook
                    settings={settings} />
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
