'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithCustomToken,
} from 'firebase/auth';
import { auth } from '@/firebase/config';
import { AxiosError } from 'axios';
import { useLogIn, useSignUp } from '@/lib/query-hook';
import { SignUpFormData } from '@/components/Forms/SignUpForm';

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const { mutateAsync: logInMutation } = useLogIn();
  const { mutateAsync: signUpMutation } = useSignUp();
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

  const signUp = async (data: SignUpFormData) => {
    try {
      const res = await signUpMutation(data);
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
      const res = await logInMutation({ displayName, password });
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
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
