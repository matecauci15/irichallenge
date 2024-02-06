const {authenticateUser} = require('../auth');


const authenticateMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const isAuthenticated = await authenticateUser(email, password);

    if (!isAuthenticated) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { authenticateMiddleware };
