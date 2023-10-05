import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBASE_ADMIN_SDK_SERVICE_TYPE,
      projectId: 'devoted-time-tracking',
      private_key_id: process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY
        ? process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined,
      clientEmail: process.env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_ADMIN_SDK_CLIENT_ID,
      auth_uri: process.env.FIREBASE_ADMIN_SDK_AUTH_URI,
      token_uri: process.env.FIREBASE_ADMIN_SDK_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_ADMIN_SDK_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_ADMIN_SDK_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FIREBASE_ADMIN_SDK_UNIVERSE_DOMAIN,
    } as admin.ServiceAccount),
  });
}

const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth };
