import authService from '../services/authService';

let handleForgotPassword = async (req, res) => {
  try {
    let email = req.body.email;
    // let password = req.body.password;
    if (!email) {
      return res.status(400).json({
        errCode: 1,
        message: 'Missing inputs parameter!',
      });
    }
    await authService.handleForgotPassword(email);

    return res.status(200).json({
      errCode: 200,
      errMessage: 'Reset password succesfully',
    });
  } catch (e) {
    if (e?.status === 404) {
      return res.status(e?.status).json({
        errCode: 404,
        errMessage: e?.message,
      });
    }
    return res.status(500).json({
      errCode: 500,
      errMessage: 'Error from server!',
    });
  }
};

module.exports = {
  handleForgotPassword: handleForgotPassword,
};
