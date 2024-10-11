import { Href, router, usePathname } from "expo-router";
import { useContext, useEffect, useState } from "react";
import CustomLoader from "./CustomLoader";
import { AuthContext } from "@/contexts/AuthContext";

const authRoutes = ["/login", "/sign-up"];

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useContext(AuthContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const pathname = usePathname();

  useEffect(() => {
    if (isMounted && !loading) {
      if (!user?.isLoggedIn && !authRoutes.includes(pathname)) {
        router.replace("/login");
      } else if (user?.isLoggedIn && authRoutes.includes(pathname)) {
        router.replace("/(employees)");
      }
    }
  }, [isMounted, user, router, pathname, loading]);

  if (!isMounted) {
    return <CustomLoader />;
  }

  return children;
}
