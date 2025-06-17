"use client";
import { getUserDataByToken } from "@/lib/actions/user";
import { useUserState } from "./store/index";
import { useEffect } from "react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import app from "@/lib/firebaseConfig";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/lib/Sidebarconfig";
import { AdminSidebarComponent } from "@/components/common/admin_sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/common/app-sidebar";

const Layout = ({ children }) => {
  const router = useRouter();
  let userState = useUserState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    if (typeof window !== "undefined") {
      let token;
      if (userState.user.hasOwnProperty("uid")) {
        userState.user.getIdToken().then((token) => {
          getUserDataByToken(token).then((res) => {
            console.log(res);
            userState.setProfile(res.profile);
            setIsLoading(false);
          });
        });
      } else {
        const auth = getAuth(app);
        localStorage && (token = localStorage.getItem("token"));
        // console.log("token", token);
        signInWithCustomToken(auth, token)
          .then(async (userCredentials) => {
            let user = userCredentials.user;
            let token = await user.getIdToken();
            // localStorage && localStorage.setItem("token", token);
            userState.setUser(user);
            getUserDataByToken(token).then((res) => {
              console.log(res);
              userState.setProfile(res.profile);
              setIsLoading(false);
            });
          })
          .catch((err) => {
            router.push("/login");
          });
      }
    }
  }, []);

  return (
    <div className="flex flex-row">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
          </header> */}

          {isLoading ? "loading..." : children}
          {/* { children} */}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
