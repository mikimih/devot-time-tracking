'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithCustomToken,
} from 'firebase/auth';
import { auth } from '@/firebase/config';
import axios, { AxiosError } from 'axios';
import { Skeleton } from 'primereact/skeleton';

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser(null);
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);
  type tokenRes = {
    token: string;
  };

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const res = await axios.post<tokenRes>('/api/createUserAndGetToken', {
        email,
        password,
        displayName,
      });
      const { token } = res.data;
      const userCredential = await signInWithCustomToken(auth, token);
      setUser(userCredential.user);
      return {};
    } catch (error) {
      if (error instanceof AxiosError) {
        return { errorMessage: error.response?.data.message || error.message };
      }
    }
  };

  const logIn = async (displayName: string, password: string) => {
    try {
      const res = await axios.post<tokenRes>('/api/signInWithUsername', {
        password,
        displayName,
      });
      const { token } = res.data;
      const userCredential = await signInWithCustomToken(auth, token);
      setUser(userCredential.user);
      return {};
    } catch (error) {
      if (error instanceof AxiosError) {
        return { errorMessage: error.response?.data.message || error.message };
      }
    }
  };

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? <Skeleton height='100vh' /> : children}
    </AuthContext.Provider>
  );
};
