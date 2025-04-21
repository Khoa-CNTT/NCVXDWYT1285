import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handldLoginApi } from "../../services/userService";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { USER_ROLE } from "../../utils";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    // .min(8, "Mật khẩu phải có ít nhất 3 ký tự")
    // .matches(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ cái viết hoa")
    // .matches(/[a-z]/, "Mật khẩu phải có ít nhất một chữ cái viết thường")
    // .matches(/[0-9]/, "Mật khẩu phải có ít nhất một chữ số")
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt')
    .required("Mật khẩu là bắt buộc"),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPassowrd: false,
    };
  }

  handleLogin = async ({ email, password }) => {
    try {
      let data = await handldLoginApi(email, password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        if (data.user?.roleId === USER_ROLE.ADMIN) {
          if (this.props.history) {
            this.props.history.push(`/system/user-redux`);
          }
        }
        if (data.user?.roleId === USER_ROLE.DOCTOR) {
          if (this.props.history) {
            this.props.history.push(`/doctor/manage-schedule`);
          }
        }
        toast.success("Login success");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassowrd: !this.state.isShowPassowrd,
    });
  };

  render() {
    // JSX
    return (
      <div className="login-background">
        <div className="login-container">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              this.handleLogin(values);
              setSubmitting(false);
            }}
          >
            {({ handleBlur, isSubmitting }) => (
              <Form>
                <div className="login-content">
                  <div className="col-12 text-login">Login</div>
                  <div className="col-12 form-group login-input">
                    <label htmlFor="email">Username</label>
                    <Field
                      id="email"
                      placeholder="Hải Đăng"
                      type="email"
                      className="form-control"
                      name="email"
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div className="col-12 form-group login-input">
                    <label htmlFor="password">Password</label>
                    <div className="custom-input-password">
                      <Field
                        id="password"
                        className="form-control"
                        placeholder="Enter your password..."
                        type={this.state.isShowPassowrd ? "text" : "password"}
                        name="password"
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        component="div"
                        name="password"
                        style={{ color: "red" }}
                      />
                      <span
                        onClick={() => {
                          this.handleShowHidePassword();
                        }}
                      >
                        <i
                          className={
                            this.state.isShowPassowrd
                              ? "far fa-eye"
                              : "far fa-eye-slash"
                          }
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-12" style={{ color: "red" }}>
                    {this.state.errMessage}
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn-login"
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                  </div>
                  <div className="col-12">
                    <Link className="forgot-password" to="/forgot-password">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
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
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
