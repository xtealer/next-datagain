/* eslint-disable import/no-anonymous-default-export */
import { Collections } from "../types/Collections";
import { Unsubscribe } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { UserFirestoreData } from "../types/User";

export default (id: string | null | undefined) => {
  const [user, setUser] = useState<undefined | null | UserFirestoreData>(
    undefined
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof id !== "string") {
      return;
    }

    let unsubscribe: Unsubscribe;

    new Promise(async () => {
      try {
        const firebaseFirestore = (await import("../helpers/initFirebase"))
          .firebaseFirestore;
        const collectionRef = collection(firebaseFirestore, Collections.USERS);
        const docRef = doc(collectionRef, id);

        const docSnap = await getDoc(docRef);
        const newData = docSnap.data() as UserFirestoreData;
        setUser(newData);
      } catch (err) {}
    });

    return () => {
      unsubscribe?.();
    };
  }, [id]);

  return user;
};
