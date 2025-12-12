const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  participants_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'bookings',
  underscored: true
});

module.exports = Booking;
