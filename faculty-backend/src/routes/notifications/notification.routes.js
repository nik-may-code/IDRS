const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/notifications/notification.controller');
router.post('/store-subscription', notificationController.storeSub);
router.post('/send-notification', notificationController.sendNotification);
router.get('/notification-status',  notificationController.getNotificationStatus);
router.post('/mark-notification-read',  notificationController.markRead);
router.delete('/notification-status',  notificationController.deleteAll);

module.exports = router;