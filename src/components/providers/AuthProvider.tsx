import { Spinner } from "@/components/ui/spinner";
import { db } from "@/configs/firebase";
import { useGetCurrentUser } from "@/hooks/queries";
import { useCurrentUserStore } from "@/stores";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUserData, isFetchingCurrentUserData } = useGetCurrentUser();
  const { signIn } = useCurrentUserStore();

  useEffect(() => {
    const fetchData = async () => {
      const firebaseUid = Cookies.get("fireBaseUid");

      if (currentUserData && firebaseUid) {
        signIn(currentUserData);

        try {
          const userDocRef = doc(db, "users", firebaseUid);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            console.log(userSnapshot.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [isFetchingCurrentUserData]);

  return Cookies.get("accessToken") && isFetchingCurrentUserData ? (
    <div className="h-screen w-screen z-999 flex items-center justify-center">
      <Spinner>
        <span className="text-sm font-medium mt-0.5">Loading user data...</span>
      </Spinner>
    </div>
  ) : (
    children
  );
};
