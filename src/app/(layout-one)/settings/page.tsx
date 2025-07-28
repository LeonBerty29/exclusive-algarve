import { auth } from "@/auth";
import { ProtectedRoute } from "@/components/protected/protected-route";
import { UserProfileDisplay } from "@/components/settings/user-profile-display";
import { getUserProfile } from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session || !session?.user) {
    return redirect("/login");
  }
  const accessToken = session?.accessToken;

  const userProfileResponse = await getUserProfile(accessToken);
  const userProfile = userProfileResponse.client;
  // console.log({ session });

  // console.log({ userProfile });
  // console.log("Session In page", session);

  return (
    <ProtectedRoute>
      <div className="pt-24 container mx-auto max-w-5xl px-4 min-h-screen flex justify-center">
        <div className="space-y-6 h-fit w-full my-auto">
          {/* <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and profile information.
          </p>
        </div> */}

          <UserProfileDisplay
            userProfile={{
              firstName: userProfile.first_name,
              lastName: userProfile.last_name,
              phoneNumber: userProfile.phone,
            }}
            accessToken={accessToken}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default page;