import * as admin from 'firebase-admin';
import serviceAccount from '@/firebase/adminsdk.json';

export default function getFirebaseAdminApp() {
  let app;
  try {
    app = admin.initializeApp(
      {
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount
        ),
      },
      'devoted-time-tracking'
    );
  } catch (error) {
    app = admin.app('devoted-time-tracking');
  }
  return app;
}
