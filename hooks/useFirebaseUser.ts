/* eslint-disable import/no-anonymous-default-export */
import { onAuthStateChanged, Unsubscribe, User } from "firebase/auth";
import { useState, useEffect } from "react";

export default () => {
  const [firebaseUser, setFirebaseUser] = useState<undefined | null | User>(
    undefined
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let unsubscribe: Unsubscribe;

    new Promise(async () => {
      try {
        const firebaseAuth = (await import("../helpers/initFirebase"))
          .firebaseAuth;
        unsubscribe = onAuthStateChanged(firebaseAuth, (u) => {
          setFirebaseUser(u);
        });
      } catch (err) {}
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  return firebaseUser;
};
