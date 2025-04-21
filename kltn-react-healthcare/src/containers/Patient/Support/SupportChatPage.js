import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';
import './SupportChatPage.scss'

class SupportChatPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    handleViewSupportPage = () => {
        if (this.props.history) {
            this.props.history.push(`/support/chat-page`)
        }
    }

    render() {
        return (
            <div>
                <HomeHeader/>
                <div className='spp-container'>
                        <div className='spp-title'><FormattedMessage id='patient.support.support-title' /></div>
                        <p><FormattedMessage id='patient.support.support-content' /></p>
                        <p><FormattedMessage id='patient.support.click-here' /> <span className='support-button' onClick={() => this.handleViewSupportPage()}><FormattedMessage id='patient.support.support' /></span></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(SupportChatPage);
