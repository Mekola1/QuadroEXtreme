const sequelize = require('../config/database');
const User = require('./user');
const Tour = require('./tour');
const Booking = require('./booking');
const Message = require('./message');

/* ======================
    BOOKING ↔ TOUR (Це було пропущено!)
====================== */
Tour.hasMany(Booking, { foreignKey: 'tour_id', as: 'Bookings' });
Booking.belongsTo(Tour, { foreignKey: 'tour_id', as: 'Tour' });

/* ======================
    BOOKING ↔ USER (Клієнт)
====================== */
User.hasMany(Booking, { foreignKey: 'user_id', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'user_id', as: 'User' }); // Змінено на 'User', щоб збігалося з контролером

/* ======================
    GUIDE ↔ TOURS
====================== */
User.hasMany(Tour, { foreignKey: 'guide_id', as: 'guidedTours' });
Tour.belongsTo(User, { foreignKey: 'guide_id', as: 'guide' });

/* ======================
    MESSAGES
====================== */
User.hasMany(Message, { foreignKey: 'from_user_id', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'to_user_id', as: 'receivedMessages' });

Message.belongsTo(User, { foreignKey: 'from_user_id', as: 'fromUser' });
Message.belongsTo(User, { foreignKey: 'to_user_id', as: 'toUser' });

Booking.hasMany(Message, { foreignKey: 'booking_id', as: 'messages' });
Message.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

/* ======================
    INIT
====================== */
async function initDb() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // sync({ alter: true }) оновить таблиці, якщо додалися нові колонки (foreign keys)
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized with database');
  } catch (err) {
    console.error('❌ Failed to init DB:', err);
  }
}

initDb();

module.exports = {
  sequelize,
  User,
  Tour,
  Booking,
  Message
};
