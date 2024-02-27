import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  auth,
  emailprovider,
  signinprovider,
  gmailprovider,
  popup,
} from "../../firebase.config";
import PropTypes from "prop-types";

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthContext = React.createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password, displayName) {
    try {
      const userCredential = await emailprovider(email, password);
      const updatedUser = { ...userCredential.user, displayName };
      await axios.post(`http://localhost/register/${email}`);
      return updatedUser;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }
  function login(email, password) {
    return signinprovider(email, password);
  }

  function loginWithGoogle() {
    return popup(gmailprovider);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  async function deleteAccount() {
    await currentUser.delete();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
    updatePassword,
    deleteAccount,
  };

  return React.createElement(
    AuthContext.Provider,
    { value: value },
    !loading && children
  );
}

export { useAuth, AuthProvider };
