import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';

import './Login.scss';
import { forgotPasswordAPI } from '../../services/userService';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
});

class ForgotPassWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
  }

  handleForgotPassword = async ({ email }) => {
    try {
      let data = await forgotPasswordAPI({
        email,
      });
      if (data && data.errCode === 200) {
        this.setState({
          status: true,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error?.response?.data?.errMessage);
      }
    }
  };

  render() {
    // JSX
    return (
      <div className="login-background">
        <div className="login-container">
          {this.state.status ? (
            <div className="login-success">
              <h2>Bạn đã cập nhật lại mật khẩu thành công!</h2>
              <p>Vui lòng kiểm tra thông tin ở email</p>
            </div>
          ) : (
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                this.handleForgotPassword(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, handleBlur }) => (
                <Form>
                  <div className="login-content">
                    <div className="col-12 text-login" style={{ fontSize: '30px', marginBottom: '80px' }}>
                      Forgot your password?
                    </div>
                    <div className="col-12 form-group login-input">
                      <Field
                        placeholder="Enter your Email..."
                        type="email"
                        className="form-control"
                        name="email"
                        onBlur={handleBlur}
                      />
                      <ErrorMessage component="div" name="email" style={{ color: 'red' }} />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-login" disabled={isSubmitting}>
                        Gửi Lại Mật Khẩu
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
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
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassWord);
