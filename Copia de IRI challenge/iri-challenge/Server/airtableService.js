const Airtable = require('airtable');

const API_KEY = 'patPCzGlVkpFWcEBS.c66a49ff1fef9de2ac2ff2d684192fdc6d831ce95584a79d69761b0d2624c561';
const DATABASE_ID = 'appoGnfbeV916mX4i';

const base = new Airtable({ apiKey: API_KEY }).base(DATABASE_ID);

const getAirtableData = async () => {
  return new Promise((resolve, reject) => {
    const records = [];

    base('Airtable1').select({
      maxRecords: 10,
      view: 'Grid view',
      fields: ['Email', 'Password'],
    }).eachPage(
      function page(pageRecords, fetchNextPage) {
        records.push(...pageRecords);
        fetchNextPage();
      },
      function done(error) {
        if (error) {
          reject(error);
        } else {
          resolve(records);
        }
      }
    );
  });
};

const sendForm = async (studentName, hoursMet, progressDescription) => {
    return new Promise((resolve, reject) => {
      base('Airtable2').create([
        {
          fields: {
            "Student's Name": studentName,
            "Hours Met": hoursMet,
            "Progress Description": progressDescription,
          }
        }
      ], (err, records) => {
        if (err) {
          console.error('Error in Airtable:', err);
          reject(err);
        } else {
          resolve(records);
        }
      });
    });
  };
  

 module.exports = {getAirtableData, sendForm}