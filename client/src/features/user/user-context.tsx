'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { doc, getDoc } from 'firebase/firestore/lite';

import { getFirebaseAuth, getFirestore } from '@/firebase';

import { User } from './types';

type UserContext = { user: undefined | null | User };

const defaultValue: UserContext = {
  user: undefined,
};
const Context = createContext<UserContext>(defaultValue);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserContext['user']>(undefined);
  useEffectOnce(() => {
    const unsub = getFirebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        getDoc(doc(getFirestore(), 'users', user.uid))
          .then((userDoc) => {
            setUser({ id: user.uid, email: user.email!, displayName: userDoc.get('displayName') });
          })
          .catch(() => {
            setUser({ id: user.uid, email: user.email!, displayName: undefined });
          });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsub();
    };
  });
  return <Context.Provider value={{ user }}>{children}</Context.Provider>;
}

export const useUser = () => useContext(Context);
