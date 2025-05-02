<template>
    <div>
      <button @click="sendNotification">Send Notification</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      sendNotification() {
        // Check if the Notification API is supported
        if ("Notification" in window) {
          // Request permission if not granted yet
          if (Notification.permission === "granted") {
            // Show notification
            new Notification("Hi!", {
              body: "This is your Vue PWA talking!",
            });
          } else if (Notification.permission !== "denied") {
            // Request permission
            Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                new Notification("Hi!", {
                  body: "This is your Vue PWA talking!",
                });
              }
            });
          }
        } else {
          alert("Your browser does not support notifications.");
        }
      }
    }
  };
  </script>
  