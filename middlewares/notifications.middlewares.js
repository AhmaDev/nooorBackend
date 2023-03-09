var FCM = require("fcm-node");
var serverKey = process.env.FIREBASE_SERVER_KEY; //put your server key here
var fcm = new FCM(serverKey);

module.exports.sendMessage = function ({ title, body, recievers }) {
  var message = {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    registration_ids: recievers,
    notification: {
      title: title,
      body: body,
    },
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!", err);
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};
