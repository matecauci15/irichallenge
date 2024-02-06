const { getAirtableData } = require('../airtableService'); // Asegúrate de tener la función para obtener datos de Airtable

const authenticateUser = async (email, password) => {
  try {
    const records = await getAirtableData(); // Obtener datos de Airtable
    const foundRecord = records.find(
      (record) => record.get('Email') === email && record.get('Password') === password
    );

    return !!foundRecord; // Devolver true si se encuentra el registro, de lo contrario, false
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw new Error('Internal server error');
  }
};

module.exports = { authenticateUser };
