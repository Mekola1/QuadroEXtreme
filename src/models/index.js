const sequelize = require('../config/database');
const User = require('./user');
const Tour = require('./tour');
const Booking = require('./booking');
const Message = require('./message');

// Relations
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Tour.hasMany(Booking, { foreignKey: 'tour_id' });
Booking.belongsTo(Tour, { foreignKey: 'tour_id' });

User.hasMany(Message, { foreignKey: 'from_user_id', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'to_user_id', as: 'receivedMessages' });

Message.belongsTo(User, { foreignKey: 'from_user_id', as: 'fromUser' });
Message.belongsTo(User, { foreignKey: 'to_user_id', as: 'toUser' });

Booking.hasMany(Message, { foreignKey: 'booking_id' });
Message.belongsTo(Booking, { foreignKey: 'booking_id' });

async function initDb() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');

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
