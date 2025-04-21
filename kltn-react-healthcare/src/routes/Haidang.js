import React, { Component } from 'react';

class Haidang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault(); // Ngăn trang reload
    console.log('Username:', this.state.username);
    console.log('Password:', this.state.password);
    alert('Login successful!');
  };

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0px auto',
    padding: '20px',
    border: '1px solid rgb(221, 221, 221)',
    borderadius: '8px',
    backgroundColor: 'rgb(33 96 226)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Haidang;