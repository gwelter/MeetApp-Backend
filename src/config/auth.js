import 'dotenv/config';

export default {
  secret: process.env.JWT_SECRET,
  expiresIn: '7d',
};
