importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBVuhnWtgChq83WqLdKcETtFJW4NvC46Q8",
    authDomain: "bible-conference-06-mfmcaasoyc.firebaseapp.com",
    databaseURL: "https://bible-conference-06-mfmcaasoyc-default-rtdb.firebaseio.com",
    projectId: "bible-conference-06-mfmcaasoyc",
    storageBucket: "bible-conference-06-mfmcaasoyc.firebasestorage.app",
    messagingSenderId: "683401524399",
    appId: "1:683401524399:web:5b59f2eaf6b679c155905a"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/BIBLE-CONFERENCE-2026-MFMCAASOYC/icon.svg',
        vibrate: [200, 100, 200]
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
