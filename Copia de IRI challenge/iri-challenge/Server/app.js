// const express = require('express');
// const routes = require('./src/routes');
// const morgan = require("morgan");
// const cors = require('cors');

// const PORT = process.env.PORT || 3000;

// const server = express();

// server.use(morgan('combined'));
// server.use(cors());
// server.use(express.json());

// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
//   });

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,  // Habilitar si estás enviando cookies o credenciales
// };
  
//   server.use(cors(corsOptions));

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// server.use('/', routes);

// server.use((err, req, res, next) => { 
//     const status = err.status || 500;
//     const message = err.message || err;
//     console.error(err);
//     res.status(status).send(message);
//   });
  
//   module.exports = server;
  

// const express = require('express');
// const routes = require('./src/routes');
// const morgan = require("morgan");
// const cors = require('cors');
// // const bodyParser = require('body-parser');


// const PORT = process.env.PORT || 3000;

// const server = express();

// const corsOptions = {
//   origin: 'http://localhost:5173',
// };

// server.use(cors(corsOptions));
// server.use(morgan('combined'));
// server.use(express.json());
// // server.use(bodyParser.json());

// server.options('*', cors(corsOptions));

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// server.use('/', routes);

// server.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Internal Server Error');
// });

// server.use((err, req, res, next) => { 
//     const status = err.status || 500;
//     const message = err.message || err;
//     console.error(err);
//     res.status(status).send(message);
// });

// module.exports = server;

const express = require('express');
const routes = require('./src/routes');
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;

const server = express();

const corsOptions = {
  origin: 'http://localhost:5173',
};

server.use(cors(corsOptions));
server.use(morgan('combined'));
server.use(bodyParser.json());

server.options('*', cors(corsOptions));

server.use(session({
  secret: 'mATEO',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/authenticate');
  }
};
server.use('/sendForm', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '/sendForm'));
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.use('/', routes);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

server.use((err, req, res, next) => { 
  const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;