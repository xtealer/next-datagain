import { AppOptions, initializeApp, ServiceAccount } from "firebase-admin";
import { cert, getApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase/auth";

const credentials: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  privateKey: (process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY ?? "").replace(
    /\\n/g,
    "\n"
  ),
};

const options: AppOptions = {
  credential: cert(credentials),
  databaseURL: process.env.databaseURL,
};

function createFirebaseAdminApp(config: AppOptions) {
  if (getApps().length === 0) {
    return initializeApp(config);
  } else {
    return getApp();
  }
}

export const firebaseAdmin: any = createFirebaseAdminApp(options);
export const adminAuth = getAuth(firebaseAdmin);
