const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'The email is already exists' });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });

    await newUser.save();
    res.json({ message: 'Register Success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // login success create token
    const payload = { id: user._id, name: user.username };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// TOKEN VARIFY
const verifyToken = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.send(false);

    jwt.verify(token, process.env.SECRET_KEY, async (err, verified) => {
      if (err) {
        return res.send(false);
      }
      const user = await User.findById(verified.id);
      if (!user) {
        return res.send(false);
      }
      return res.send(true);
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
};
