/* eslint-disable import/no-anonymous-default-export */
import { Collections } from "../types/Collections";
import { Unsubscribe } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Reward } from "../types/Reward";

export default (id: string | null | undefined) => {
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof id !== "string") {
      return;
    }

    let unsubscribe: Unsubscribe;

    new Promise(async () => {
      try {
        const firebaseFirestore = (await import("../helpers/initFirebase"))
          .firebaseFirestore;
        const collectionRef = collection(
          firebaseFirestore,
          Collections.REWARDS
        );
        const queryRef = query(collectionRef, where("userId", "==", id));

        unsubscribe = onSnapshot(queryRef, (s) => {
          const newRewards: Reward[] = [];

          for (const item of s.docs) {
            const newData = item.data() as Reward;
            newRewards.push(newData);
          }

          setRewards(newRewards);
        });
      } catch (err) {}
    });

    return () => {
      unsubscribe?.();
    };
  }, [id, setRewards]);

  return rewards;
};
