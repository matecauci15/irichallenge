const express = require('express');
const router = express.Router();
const {getAirtableData, sendForm } = require('../../airtableService');
const { authenticateMiddleware } = require('./middleware.js');


router.get('/formulario', (req, res) => {
  res.send('Welcome to the home page');
});


router.get('/getAirtableData', async (req, res) => {
  try {
    const records = await getAirtableData();
    res.json(records);
  } catch (error) {
    console.error('Error fetching Airtable data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// router.post('/authenticate', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const records = await getAirtableData();
//     const foundRecord = records.find(
//       (record) => record.get('Email') === email && record.get('Password') === password
//     );
//     if (foundRecord) {
//       res.status(200).json({ success: true, message: 'Authentication successful' });
//     } else {
//       res.status(404).json({ success: false, message: 'Authentication failed' });
//     }
//   } catch (error) {
//     console.error('Error fetching Airtable data:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  try {
    const records = await getAirtableData();
    const foundRecord = records.find(
      (record) => record.get('Email') === email && record.get('Password') === password
    );

    if (foundRecord) {
      res.status(200).json({ success: true, message: 'Authentication successful', redirectTo: '/sendForm' });
    } else {
      res.status(404).json({ success: false, message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Error fetching Airtable data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.use('/sendForm', authenticateMiddleware);

router.post('/sendForm', async (req, res) => {
  const {studentName, hoursMet, progressDescription} = req.body;
  try {
    await sendForm(studentName, hoursMet, progressDescription);
    res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


module.exports = router;
