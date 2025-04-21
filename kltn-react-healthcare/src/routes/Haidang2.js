
import React, { Component } from 'react';

class Haidang2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    // Kiểm tra các điều kiện đăng nhập (ví dụ: không để trống thông tin)
    if (!username || !password) {
      this.setState({ errorMessage: 'Vui lòng nhập đủ thông tin!' });
    } else {
      // Xử lý đăng nhập (giả sử đã có API backend)
      console.log('Đăng nhập với tên người dùng:', username, 'và mật khẩu:', password);
      this.setState({ errorMessage: '' });
      // Có thể chuyển hướng tới trang khác nếu cần
    }
  };

  render() {
    const { username, password, errorMessage } = this.state;

    return (
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Tên người dùng:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    );
  }
}

export default Haidang2;
