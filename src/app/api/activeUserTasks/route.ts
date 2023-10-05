import { db } from '@/firebase/config';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { collections } from '@/firebase/firestore/types';
import { auth } from '@/firebase/getFirebaseAdminApp';
import { headers } from 'next/headers';
import { QueryDocumentSnapshot } from '@firebase/firestore';

export async function GET() {
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
    const decodedToken = await auth.verifyIdToken(authToken);
    const userUid = decodedToken.uid;
    const userTasksRef = await getDocs(
      query(
        collection(doc(db, collections.USERS, userUid), collections.TASK),
        where('isStopped', '==', false)
      )
    );
    const activeUserTasks = userTasksRef.docs.map(
      (val: QueryDocumentSnapshot) => {
        return {
          id: val.id,
          ...val.data(),
        };
      }
    );

    return Response.json({ data: activeUserTasks });
  } catch (error) {
    return Response.json(
      { message: error || 'Error while getting all active tasks.' },
      { status: 400 }
    );
  }
}
