// const authenticateUser = require('../services/authServices');

// const getUser = (req, res) => {
//   res.send('Welcome to the home page');
// };

// const postUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const isAuthenticated = await authenticateUser(email, password);

//     if (isAuthenticated) {
//       res.status(200).json({ message: 'Authentication successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Error authenticating user:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = { getUser, postUser };
