import { auth } from '@/remote/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/store/atom/user';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setUser = useSetAtom(userAtom);

  onAuthStateChanged(auth, (user) => {
    if (user == null) {
      setUser(null);
    } else {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      });
    }

    setIsAuthenticated(true);
  });

  if (isAuthenticated === false) {
    return null;
  }

  return <>{children}</>;
}
