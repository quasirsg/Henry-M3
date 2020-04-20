const s = require('sequelize');
const db = require('./db');

const User = db.define('user', {});

module.exports = User;
