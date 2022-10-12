/* eslint-disable import/no-anonymous-default-export */
import { useWeb3 } from "@3rdweb/hooks";
import { signOut } from "firebase/auth";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useGlobalStore from "../store/useGlobalStore";
import useFirebaseUser from "./useFirebaseUser";

export default () => {
  const firebaseUser = useFirebaseUser();
  const { address, disconnectWallet } = useWeb3();
  const setLoading = useGlobalStore((state: any) => state.setLoading);

  const doLogout = useCallback(async () => {
    try {
      setLoading(true);
      const firebaseAuth = await import("../helpers/initFirebase").then(
        (mod) => mod.firebaseAuth
      );

      await signOut(firebaseAuth);
      toast.success("Session ended.");
    } catch (err) {
      console.log("doLogout:error", err);
    }

    try {
      disconnectWallet();
    } catch (err) {
      console.log("doLogout:error", err);
    }
    setLoading(false);
  }, [disconnectWallet, setLoading]);

  return { doLogout, address, firebaseUser };
};
