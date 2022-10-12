/* eslint-disable import/no-anonymous-default-export */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Router from "next/router";
import { useEffect } from "react";
import useGlobalStore from "../store/useGlobalStore";
import useSessionUtils from "./useSessionUtils";

export default () => {
  const { setUser, user, setLoading }: any = useGlobalStore((state) => state);
  const { firebaseUser, address } = useSessionUtils();

  useEffect(() => {
    const timeoutRef = setTimeout(async () => {
      try {
        const firebaseFirestore = (await import("../helpers/initFirebase"))
          .firebaseFirestore;
        const collectionRef = collection(firebaseFirestore, "users");

        if (firebaseUser) {
          const docRef = doc(collectionRef, firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          const docData = docSnap.data();
          if (docData) {
            setUser(docData);
          } else {
            Router.push("/signup");
          }
          return;
        }

        if (typeof address === "string") {
          const queryRef = query(
            collectionRef,
            where("metamaskId", "==", address)
          );
          const querySnap = await getDocs(queryRef);

          if (querySnap.docs.length === 0) {
            return;
          }

          const userDataFound = querySnap.docs[0].data();
          setUser(userDataFound);
          // TODO: Get token for login.
          Router.push("/dashboard");
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }, 2500);

    return () => {
      clearTimeout(timeoutRef);
    };
  }, [firebaseUser, address, setUser]);

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      if (firebaseUser === null) {
        Router.push("/");
      } else if (user) {
        Router.push("/dashboard");
      }
      console.log("ran");
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timeoutRef);
    };
  }, [user, firebaseUser, setLoading]);
};
