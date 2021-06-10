import { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'modules/firebase';

export const AuthContext = createContext<{
  user: firebase.User | null,
  loading: Boolean,
  signin: (email, password) => Promise<void>,
  signup: (email, password) => Promise<void>,
  signout: () => Promise<void>
}>({
  user: null,
  loading: false,
  signin: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  signout: () => Promise.resolve()
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signin = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signup = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const signout = async () => {
    await firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user, loading, signin, signup, signout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
