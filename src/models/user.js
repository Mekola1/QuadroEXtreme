const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(120),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password_hash: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING(120),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  }
}, {
  tableName: 'users',
  underscored: true
});

module.exports = User;
