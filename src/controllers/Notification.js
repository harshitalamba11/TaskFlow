import Notification from "../models/Notification.js";

export const getnotification = async (req, res) => {
  const notifications = await Notification.find({
    userId: req.user.userId,
    tenantId: req.user.tenantId,
  }).sort({ createdAt: -1 });

  res.json(notifications);
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
        tenantId: req.user.tenantId,
      },
      { $set: { isRead: true } },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification marked as read", notification });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};