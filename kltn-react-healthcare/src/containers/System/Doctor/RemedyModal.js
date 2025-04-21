import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import Select from 'react-select';
import { toast } from 'react-toastify'
import moment from 'moment';
import { CommonUtils } from '../../../utils';


class RemedyModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: '',
            medicine: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnchangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleOnchangeImg = async (event) => {
        let data = event.target.files
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log("trungtan", base64)
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleChangeMedicine = (e) => {
        this.setState({
            medicine: e.target.value
        })
    }

    sendRemedyConfirm = () => {
        this.props.sendRemedyConfirm(this.state)
    }

    render() {
        let { isOpenRemedyModal, closeRemedyModal, dataModal, sendRemedyConfirm } = this.props
        console.log(this.state.medicine)

        return (
            <div>
                <Modal
                    isOpen={isOpenRemedyModal}
                    size='md'
                    className={'booking-modal-container'}
                    centered
                    backdrop={true}
                >
                    <div className="modal-header">
                        <h5 className="modal-title">Gửi hóa đơn khám bệnh</h5>
                        <button
                            onClick={closeRemedyModal}
                            type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email bệnh nhân</label>
                                <input
                                    onChange={(e) => this.handleOnchangeEmail(e)}
                                    className='form-control' type='email' value={this.state.email} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Chọn file đơn thuốc</label>
                                <input
                                    onChange={(e) => this.handleOnchangeImg(e)}
                                    className='form-control-file' type='file' />
                            </div> 
                            <div class="form-group col-12">
                                <label for="exampleFormControlTextarea1">Thông tin thuốc:</label>
                                <textarea onChange={(e)=>this.handleChangeMedicine(e)} class="form-control" id="exampleFormControlTextarea1" ></textarea>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.sendRemedyConfirm()}>Gửi</Button>{' '}
                        <Button color="secondary" onClick={closeRemedyModal}>Đóng</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
