import bcrypt from 'bcrypt';
import { db } from '@/firebase/config';
import { getDocs, query, collection, where, limit } from 'firebase/firestore';
import { collections, User } from '@/firebase/firestore/types';
import getFirebaseAdminApp from '@/firebase/getFirebaseAdminApp';
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
} from 'firebase/firestore';

getFirebaseAdminApp();
const userConverter = {
  toFirestore(user: User): DocumentData {
    return user as User;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options)!;
    return data as User;
  },
};
export async function POST(req: Request) {
  const auth = getFirebaseAdminApp().auth();
  type LoginData = {
    password: string;
    displayName: string;
  };
  const body = (await req.json()) as LoginData;
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, collections.USERS),
        where('displayName', '==', body.displayName),
        limit(1)
      ).withConverter(userConverter)
    );
    if (querySnapshot.empty) {
      return Response.json(
        { message: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data();
    const isSamePassword = await bcrypt.compare(body.password, user.password);
    if (!isSamePassword) {
      return Response.json(
        { message: 'Invalid username or password.' },
        { status: 401 }
      );
    }
    const token = await auth.createCustomToken(userDoc.id);
    return Response.json({ token });
  } catch (error) {
    return Response.json(
      { message: error || 'Error while login.' },
      { status: 400 }
    );
  }
}
