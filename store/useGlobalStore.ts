import create from "zustand";
import { UserFirestoreData } from "../types/User";

const useGlobalStore = create((set) => ({
  loading: true,
  user: null,
  setUser: (user: UserFirestoreData) => set((state: any) => ({ user })),
  setLoading: (loading: boolean) => set((state: any) => ({ loading })),
}));

export default useGlobalStore;
