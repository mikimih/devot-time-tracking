import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:
        process.env.FIREBASE_ADMIN_SDK_PROJECT_ID || 'devoted-time-tracking',
      privateKey: process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY
        ? process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined,
      clientEmail: process.env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
    }),
  });
}

const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth };
