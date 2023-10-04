import { headers } from 'next/headers';
import getFirebaseAdminApp from '@/firebase/getFirebaseAdminApp';
import { collections, UpdateTaskType } from '@/firebase/firestore/types';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export async function POST(req: Request) {
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
    const activeTasks = (await req.json()) as UpdateTaskType[];
    await Promise.all(
      activeTasks.map(async (val) => {
        const userTaskRef = doc(
          collection(doc(db, collections.USERS, userUid), collections.TASK),
          val.id
        );
        await updateDoc(userTaskRef, {
          isStopped: true,
          duration: val.duration,
        });
      })
    );

    return Response.json({});
  } catch (error) {
    return Response.json(
      { message: error || 'Error while updating tasks.' },
      { status: 400 }
    );
  }
}
