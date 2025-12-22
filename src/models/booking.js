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
  underscored: true,
  timestamps: true // переконайтеся, що це увімкнено для created_at
});

Booking.associate = (models) => {
  // Зв'язок з туром (те саме ім'я "Tour", яке ви використовуєте в контролері)
  Booking.belongsTo(models.Tour, {
    foreignKey: 'tour_id',
    as: 'Tour'
  });

  // Зв'язок з користувачем (клієнтом)
  Booking.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'User'
  });
};

module.exports = Booking;
