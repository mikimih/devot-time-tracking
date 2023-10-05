import { db } from '@/firebase/config';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { collections, TrackedTaskTime } from '@/firebase/firestore/types';
import { auth } from '@/firebase/getFirebaseAdminApp';
import { headers } from 'next/headers';

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

    const structuredData: TrackedTaskTime[] = [];

    const userRef = doc(db, collections.USERS, userUid);
    const taskQuery = query(
      collection(userRef, collections.TASK),
      where('isStopped', '==', true)
    );
    const taskSnapshot = await getDocs(taskQuery);

    const promises: Promise<void>[] = [];
    taskSnapshot.docs.forEach((taskDoc) => {
      const taskId = taskDoc.id;
      const taskData = taskDoc.data() as DocumentData;

      const trackedTasksQuery = query(
        collection(userRef, collections.TASK, taskId, collections.TRACKED_TASK)
      );

      const promise = getDocs(trackedTasksQuery).then(
        (trackedTasksSnapshot) => {
          trackedTasksSnapshot.forEach((trackedTaskDoc) => {
            const trackedTaskId = trackedTaskDoc.id;
            const trackedTaskData = trackedTaskDoc.data();

            structuredData.push({
              id: trackedTaskId,
              date: trackedTaskData.date,
              timeTrack: trackedTaskData.timeTrack,
              description: taskData.description,
            });
          });
        }
      );
      promises.push(promise);
    });
    await Promise.all(promises);

    return Response.json({ data: structuredData });
  } catch (error) {
    return Response.json(
      { message: error || 'Error while getting all tracked tasks.' },
      { status: 400 }
    );
  }
}
