const { Message, Booking, User } = require('../models');

async function sendMessage(req, res) {
  try {
    const { booking_id, to_user_id, text } = req.body;

    const booking = await Booking.findByPk(booking_id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const msg = await Message.create({
      booking_id,
      from_user_id: req.user.id,
      to_user_id,
      text
    });

    res.status(201).json(msg);
  } catch (err) {
    console.error('sendMessage error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getMessagesByBooking(req, res) {
  try {
    const { bookingId } = req.params;

    const messages = await Message.findAll({
      where: { booking_id: bookingId },
      include: [
        { model: User, as: 'fromUser', attributes: ['id', 'full_name'] },
        { model: User, as: 'toUser', attributes: ['id', 'full_name'] }
      ],
      order: [['created_at', 'ASC']]
    });

    res.json(messages);
  } catch (err) {
    console.error('getMessagesByBooking error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * DELETE message
 * Only sender can delete own message
 */
async function deleteMessage(req, res) {
  try {
    const { id } = req.params;

    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.from_user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await message.destroy();
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error('deleteMessage error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  sendMessage,
  getMessagesByBooking,
  deleteMessage
};

