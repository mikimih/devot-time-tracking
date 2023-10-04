import { db } from '@/firebase/config';
import { collection, addDoc, doc } from 'firebase/firestore';
import { collections } from '@/firebase/firestore/types';
import getFirebaseAdminApp from '@/firebase/getFirebaseAdminApp';
import { headers } from 'next/headers';

export async function POST() {
  try {
    const authToken = (headers().get('authorization') || '')
      .split('Bearer ')
      .at(1);
    if (!authToken) {
      return Response.json(
        { message: 'Unauthorized response.' },
        { status: 401 }
      );
    }
    const decodedToken = await getFirebaseAdminApp()
      .auth()
      .verifyIdToken(authToken);
    const userUid = decodedToken.uid;
    const userRef = collection(
      doc(db, collections.USERS, userUid),
      collections.TASK
    );
    await addDoc(userRef, {
      description: '',
      createdAt: new Date(),
      duration: 0,
      isFinished: false,
    });

    return Response.json({});
  } catch (error) {
    return Response.json(
      { message: error || 'Error while creating new task.' },
      { status: 400 }
    );
  }
}
