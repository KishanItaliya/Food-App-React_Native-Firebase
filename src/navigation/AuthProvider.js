import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, username) => {
          let userId;

          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(user => {
                userId = user?.user.uid;
              })
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  alert('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                  alert('That email address is invalid!');
                }
                alert(error);
              });

            let db = firestore().collection('users').doc(userId);

            db.set({
              email: email,
              avatar: null,
              username: username,
              address: null,
              city: null,
              state: null,
              country: null,
              isAdmin: 2,
            });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        passwordReset: async email => {
          try {
            await auth().sendPasswordResetEmail(email);
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
