const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notifications.controller');

router.post('/api/notification/debt-reminder',notificationController.DebReminder)
router.post('/api/notification/new-investment', notificationController.NewInvestment)
router.post('/api/notification/change-amount', notificationController.ChangeAmount)
router.post('/api/notification/withdrawal', notificationController.WithDrawal)
router.post('/api/notification/promotion', notificationController.promotion)
router.post('/api/notification/settlement', notificationController.settlement)
router.post('/api/notification/send-notify-sms', notificationController.SendNotifySMS)

router.post('/api/notification-different', notificationController.createNotifyDiff)
router.post('/api/notification-many-different', notificationController.createManyNotifyDiff)
router.get('/api/get-notification-client', notificationController.getNotificationClient)
router.put('/api/edit-notification-client', notificationController.editStatusNotificationClient)

router.get('/api/notification-type',notificationController.getTypeNotification)
router.get('/api/notification-type/:id',notificationController.getDetailTypeNotification)
router.post('/api/notification-type',notificationController.createTypeNotification)
router.put('/api/notification-type',notificationController.editTypeNotification)


module.exports = router;