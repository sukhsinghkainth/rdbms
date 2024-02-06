// index.js
const express = require('express');
const knex = require('knex');
const bookshelf = require('bookshelf');
// const userRoutes = require('./routes/userRoutes');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Database configuration with Knex.js
const knexConfig = {
  client: 'oracledb',
  connection: {
    user: '',
    password: '',
    connectString: 'localhost/XE',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
};

// Set up Knex.js
const connection = knex(knexConfig);
const bookshelfInstance = bookshelf(connection);

// Model
const User = bookshelfInstance.model('User', {
  tableName: 'users',
});

// Controller
const UserController = {
  async getUsers(req, res) {
    try {
      const users = await User.fetchAll();
      res.render('user', { users: users.toJSON() });

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

// Routes
const router = express.Router();
router.get('/users', UserController.getUsers);

// Mount routes under /api
app.use('/api', router);

// Start the Express server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/api/users`);
});
