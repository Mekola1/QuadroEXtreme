const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tour = sequelize.define('Tour', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false
  },
  duration_hours: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  gps_track_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  tableName: 'tours',
  underscored: true
});

module.exports = Tour;
