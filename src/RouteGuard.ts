import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "./UserContext";
import Auth from "./Auth";

export default function RouteGuard(props: any) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext) as any;

  useEffect(() => {
    if (!router.isReady) return;

    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  function isPrivatePath(path: string): boolean {
    if (path.endsWith("/")) {
      path = path.substring(0, path.length - 1);
    }
    return props.privatePaths.includes(path);
  }

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    console.log("Url: ", url);
    const publicPaths = props.publicPaths || ["/login", "/"];
    const path = url.split("?")[0];
    const loggedInUser = props.auth?.loggedInUser || null;
    const isLoggedIn = loggedInUser != null && (loggedInUser.id || "").trim() !== "";
    const needsLogin = !publicPaths.includes(path) && !isLoggedIn && isPrivatePath(path);
    setAuthorized(!needsLogin);
    if (needsLogin) {
      router.push({
        pathname: "/login",
        query: { callbackURL: router.asPath },
      });
    } else {
      setLoggedInUser(loggedInUser);
    }
  }
  return authorized && props.children;
}
