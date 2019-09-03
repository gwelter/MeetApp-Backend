import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      res.status(401).json({ error: 'Wrong username or password' });
    }

    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'Wrong username or password' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async index(req, res) {
    return res.json({ ok: true });
  }
}

export default new SessionController();
