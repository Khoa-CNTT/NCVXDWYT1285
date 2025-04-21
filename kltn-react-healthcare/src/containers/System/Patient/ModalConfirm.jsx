import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

class ModalConfirm extends Component {
  constructor(props) {
    super(props);
  }

  sendConfirm = () => {
    this.props.sendConfirm(this.state);
  };

  render() {
    let { isOpenModal, closeModal } = this.props;

    return (
      <div>
        <Modal isOpen={isOpenModal} size="md" className={'booking-modal-container'} centered backdrop={true}>
          <div className="modal-header">
            <h5 className="modal-title">Xác nhận bệnh nhân đã đặt lịch</h5>
            <button onClick={closeModal} type="button" className="close" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.sendConfirm()}>
              Xác nhận
            </Button>
            <Button color="secondary" onClick={closeModal}>
              Đóng
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);
