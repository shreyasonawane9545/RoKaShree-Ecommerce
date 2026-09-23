const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const auth = getAuth();

// PUT YOUR ADMIN UID HERE
const ADMIN_UID = "99vwhUWLmaaBy2wVMe3IsPORCWu2";

async function makeAdmin() {
  await auth.setCustomUserClaims(ADMIN_UID, {
    admin: true,
  });

  console.log("Admin role assigned successfully!");
}

makeAdmin();