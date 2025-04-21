import React, { Component } from "react";
import { registerApi } from "../../services/userService";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      gender: "1",
      roleId: "1",
      errMessage: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  // handleSubmit = async (e) => {
  //   try {
  //     const data = await registerApi(this.state); // Giả sử `registerApi` là hàm xử lý đăng ký của bạn
  //     if (data && data.errCode !== 0) {
  //       this.setState({
  //         errMessage: data.message,
  //       });
  //     }
  //     if (data && data.errCode === 0) {
  //       this.props.userRegisterSuccess(data.user); // Hàm `userRegisterSuccess` để xử lý đăng ký thành công
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       this.setState({
  //         errMessage: error.response.data.message,
  //       });
  //     }
  //   }
  // };
  handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    try {
      // Tạo đối tượng mới với cấu trúc mà bạn mong muốn
      const {
        email,
        password,
        firstName,
        lastName,
        address,
        phonenumber,
        gender,
        roleId,
      } = this.state;
      const dataToSend = {
        email,
        password,
        firstName,
        lastName,
        address,
        phonenumber,
        gender,
        roleId,
      };

      // Gọi API với dataToSend
      console.log("dataToSend FE", dataToSend);
      const data = await registerApi(dataToSend);

      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userRegisterSuccess(data.user);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        this.setState({
          errMessage: error.response.data.message,
        });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.handleSubmit} className="w-100">
            <div className="form-row">
              <div className="col-12 mt-3">
                <h2>Create a new user</h2>
              </div>
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Last name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-6">
                <label>Phone number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-3">
                <label>Sex</label>
                <select
                  name="gender"
                  className="form-control"
                  value={this.state.gender}
                  onChange={this.handleChange}
                >
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
              <div className="form-group col-3">
                <label>Role</label>
                <select
                  name="roleId"
                  className="form-control"
                  value={this.state.roleId}
                  onChange={this.handleChange}
                >
                  <option value="1">Admin</option>
                  <option value="2">Doctor</option>
                  <option value="3">Patient</option>
                </select>
              </div>
            </div>
            <div className="text-danger mb-3">{this.state.errMessage}</div>
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UserForm;
