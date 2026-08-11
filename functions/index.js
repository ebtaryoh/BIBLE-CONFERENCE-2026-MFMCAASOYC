const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendBroadcastPushNotification = functions.firestore
  .document('broadcasts/{broadcastId}')
  .onCreate(async (snap, context) => {
      const broadcast = snap.data();
      const messageText = broadcast.message;

      // 1. Fetch all tokens from the fcm_tokens collection
      const tokensSnap = await admin.firestore().collection('fcm_tokens').get();
      if (tokensSnap.empty) {
          console.log("No devices to notify.");
          return;
      }

      const tokens = [];
      tokensSnap.forEach(doc => {
          tokens.push(doc.data().token);
      });

      // 2. Setup the notification payload
      const payload = {
          notification: {
              title: "New Admin Broadcast",
              body: messageText,
              icon: "/BIBLE-CONFERENCE-2026-MFMCAASOYC/icon.svg"
          }
      };

      // 3. Send to all devices
      const response = await admin.messaging().sendToDevice(tokens, payload);
      console.log("Successfully sent messages:", response.successCount);
  });
