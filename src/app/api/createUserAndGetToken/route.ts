import bcrypt from 'bcrypt';
import { db } from '@/firebase/config';
import {
  setDoc,
  doc,
  getDocs,
  query,
  collection,
  where,
  limit,
} from 'firebase/firestore';
import { collections } from '@/firebase/firestore/types';
import getFirebaseAdminApp from '@/firebase/getFirebaseAdminApp';

const SALT_ROUNDS = 10;
export async function POST(req: Request) {
  const auth = getFirebaseAdminApp().auth();
  type SignUpData = {
    email: string;
    password: string;
    displayName: string;
  };
  const body = (await req.json()) as SignUpData;
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, collections.USERS),
        where('displayName', '==', body.displayName),
        limit(1)
      )
    );
    if (!querySnapshot.empty) {
      return Response.json(
        { message: 'Username with this information already exist.' },
        { status: 409 }
      );
    }
    const user = await auth.createUser(body);
    const hash = await bcrypt.hash(body.password, SALT_ROUNDS);

    await setDoc(doc(db, collections.USERS, user.uid), {
      password: hash,
      email: body.email,
      displayName: body.displayName,
    });
    const token = await auth.createCustomToken(user.uid);
    return Response.json({ token });
  } catch (error) {
    return Response.json(
      { message: error || 'Error while creating user' },
      { status: 400 }
    );
  }
}
