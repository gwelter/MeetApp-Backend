import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    try {
      await schema.validate(req.body);

      const userExist = await User.findOne({
        where: { email: req.body.email },
      });
      if (userExist) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const { id, name, email } = await User.create(req.body);
      return res.status(201).json({ id, name, email });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      return res.json({ ok: true });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new UserController();
