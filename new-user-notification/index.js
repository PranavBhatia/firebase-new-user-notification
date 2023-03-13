const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addWelcomeMessages = functions.auth.user().onCreate(async (user) => {
  functions.logger.log("A new user signed in for the first time.");
  const fullName = user.email || "Anonymous";

  await admin
    .firestore()
    .collection("messages")
    .add({
      name: "Firebase Bot",
      profilePicUrl: "/images/firebase-logo.png", // Firebase logo
      text: `${fullName} signed in for the first time! Welcome!`,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

  functions.logger.log(
    `Welcome message for ${fullName} is written to database.`
  );
});
