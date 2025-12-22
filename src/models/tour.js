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
  },
  guide_id: {
    type: DataTypes.UUID,
    allowNull: true
  }
}, {
  tableName: 'tours',
  underscored: true
});

// Додаємо асоціації
Tour.associate = (models) => {
  // Тур належить гіду (User)
  Tour.belongsTo(models.User, {
    foreignKey: 'guide_id',
    as: 'Guide'
  });
  // Один тур може мати багато бронювань
  Tour.hasMany(models.Booking, {
    foreignKey: 'tour_id',
    as: 'Bookings'
  });
};

module.exports = Tour;
