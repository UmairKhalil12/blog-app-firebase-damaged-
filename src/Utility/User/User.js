import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../Firebase/firebase";
import useStore from "../Zustand/Zustand";

export default function User() {
  const { setUser } = useStore();
  const {setUserInfo} = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        setUserInfo(user)
      } else {
        setUser(false);
        setUserInfo(null)
      }
    });

    return () => unsubscribe();
  }, [setUser , setUserInfo]);
};
