importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: "AIzaSyDYS6FMIMt3lwJQp-sw9wpu1IlZdUQvY4s",
  authDomain: "notifyexport.firebaseapp.com",
  projectId: "notifyexport",
  storageBucket: "notifyexport.firebasestorage.app",
  messagingSenderId: "117026570321",
  appId: "1:117026570321:web:f0716ac022b55aee097870"

});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});