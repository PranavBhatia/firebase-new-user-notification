const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.newUserTrigger = functions.auth.user().onCreate(async (user) => {
  functions.logger.log("A new user signed in for the first time");

  admin
    .firestore()
    .collection("userEvents")
    .add({
      event: "User Signed Up",
      text: `${user.email} signed in for the first time`,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

  functions.logger.log(`New user ${user.email} is saved to our db.`);
});