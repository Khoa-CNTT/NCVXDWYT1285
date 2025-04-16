import db from '../models/index';
import { generatePassword } from '../utils';
import emailService from './emailService';
import userService from './userSevices';

const handleForgotPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });

      if (!user) {
        reject({
          status: 404,
          message: 'User not found',
        });
      }

      const newPassword = generatePassword(); // the purpose is random password has 8 char
      // Send mail
      await emailService.sendEmailForgotPassword({
        language: 'vi',
        name: `${user?.firstName ? user?.firstName : ''} ${user?.lastName ? user?.lastName : ''}`,
        password: newPassword,
        email: user?.email,
      });
      // Save password
      const hashPasswordFromBcrypt = await userService.hashUserPassword(newPassword);
      user.password = hashPasswordFromBcrypt;
      await user.save();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleForgotPassword: handleForgotPassword,
};
