const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:5001',
};

app.use(cors(corsOptions));

const db = require('./app/models');
const Role = db.role;

// ======================= mysql connection ====================================
// db.sequelize.sync();
// debug resync
db.sequelize.sync({ force: true }).then(() => {
    // console.log('Drop and Resync Db');
    initial();
});

// ======================= mongo connection ====================================
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to root url.' });
});

// routes
require('./app/routes/index.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// db init function
function initial() {
    Role.create({
        id: 1,
        name: 'user',
    });

    Role.create({
        id: 2,
        name: 'moderator',
    });

    Role.create({
        id: 3,
        name: 'admin',
    });
}
