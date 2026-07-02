import { useEffect, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setInitialized, refreshTokenThunk, setUser } from "@/store/slices/authSlice";
import { getStoredAccessToken, getUser, isAccessTokenValid } from "@/lib/auth";

export function AuthInitializer({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector((s) => s.auth.initialized);

  useEffect(() => {
    async function init() {
      const accessToken = getStoredAccessToken();

      if (!accessToken) {
        dispatch(setInitialized());
        return;
      }

      if (isAccessTokenValid()) {
        const user = getUser();
        if (user) dispatch(setUser(user));
        dispatch(setInitialized());
        return;
      }

      await dispatch(refreshTokenThunk());
    }

    init();
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="h-8 w-8 rounded-full border-2 border-brand-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
