import { Collections } from "./../types/Collections";
/* eslint-disable import/no-anonymous-default-export */
import { signInWithCustomToken } from "firebase/auth";
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
import { UserFirestoreData } from "../types/User";
import useSessionUtils from "./useSessionUtils";

export default () => {
  const { setUser, user, setLoading }: any = useGlobalStore((state) => state);
  const { firebaseUser, address } = useSessionUtils();

  useEffect(() => {
    const timeoutRef = setTimeout(async () => {
      try {
        const firebaseFirestore = (await import("../helpers/initFirebase"))
          .firebaseFirestore;
        const firebaseAuth = (await import("../helpers/initFirebase"))
          .firebaseAuth;
        const collectionRef = collection(firebaseFirestore, Collections.USERS);

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

          console.log(querySnap.docs);
          if (querySnap.docs.length === 0) {
            return;
          }

          const userDataFound = querySnap.docs[0].data();
          setUser(userDataFound);
          const res = await fetch("/api/getUserTokenId", {
            body: JSON.stringify({
              id: (userDataFound as UserFirestoreData)?.documentId,
            }),
            method: "POST",
          });
          console.log(res);
          const resData = JSON.parse(await res.json());

          if (typeof resData?.token === "string") {
            await signInWithCustomToken(firebaseAuth, resData?.token);
          }

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
