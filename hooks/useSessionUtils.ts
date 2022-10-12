/* eslint-disable import/no-anonymous-default-export */
import { useWeb3 } from "@3rdweb/hooks";
import { signOut } from "firebase/auth";
import { useCallback } from "react";
import useFirebaseUser from "./useFirebaseUser";

export default () => {
  const firebaseUser = useFirebaseUser();
  const { address, disconnectWallet } = useWeb3();

  const doLogout = useCallback(async () => {
    try {
      const firebaseAuth = await import("../helpers/initFirebase").then(
        (mod) => mod.firebaseAuth
      );

      await signOut(firebaseAuth);
    } catch (err) {
      console.log("doLogout:error", err);
    }

    try {
      disconnectWallet();
    } catch (err) {
      console.log("doLogout:error", err);
    }
  }, [disconnectWallet]);

  return { doLogout, address, firebaseUser };
};
