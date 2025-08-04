const bcrypt = require('bcryptjs');
const User = require('../models/User');

// ✅ Signup Controller
exports.signup = async (req, res) => {
  try {
    console.log('📥 Signup request received');
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('⚠️ User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    console.log('✅ User created successfully:', newUser.email);
    return res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    console.error('❌ Signup error:', err.message);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// ✅ Login Controller
exports.login = async (req, res) => {
  try {
    console.log('📥 Login request received');
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid credentials');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('✅ Login successful for:', user.email);
    return res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error('❌ Login error:', err.message);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
