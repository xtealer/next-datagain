/* eslint-disable import/no-anonymous-default-export */
import { useEffect } from "react";
import { logEvent } from "@firebase/analytics";

export default () => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    new Promise(async () => {
      const firebaseAnalytics = (await import("./helpers/initFirebase"))
        .firebaseAnalytics;
      logEvent(firebaseAnalytics, "app_started");
    });
  }, []);
};
