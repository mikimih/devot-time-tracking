import { headers } from 'next/headers';
import getFirebaseAdminApp from '@/firebase/getFirebaseAdminApp';
import { collections, UpdateTaskType } from '@/firebase/firestore/types';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/config';

export async function PATCH(req: Request) {
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
    const { id, tracked, ...rest } = (await req.json()) as UpdateTaskType;

    const userUid = decodedToken.uid;
    const userTaskRef = doc(
      collection(doc(db, collections.USERS, userUid), collections.TASK),
      id
    );
    await updateDoc(userTaskRef, { ...rest });
    if (tracked) {
      const userTrackedTaskRef = collection(
        userTaskRef,
        collections.TRACKED_TASK
      );
      await addDoc(userTrackedTaskRef, tracked);
    }

    return Response.json({});
  } catch (error) {
    return Response.json(
      { message: error || 'Error while updating task.' },
      { status: 400 }
    );
  }
}

export async function DELETE(_req: Request, { params }: any) {
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

    const { id } = params;
    if (!id) {
      return Response.json(
        { message: 'The requested resource was not found.' },
        { status: 404 }
      );
    }
    const userUid = decodedToken.uid;
    const userTaskRef = doc(
      collection(doc(db, collections.USERS, userUid), collections.TASK),
      id
    );
    await deleteDoc(userTaskRef);

    return Response.json({});
  } catch (error) {
    return Response.json(
      { message: error || 'Error while deleting task.' },
      { status: 400 }
    );
  }
}
