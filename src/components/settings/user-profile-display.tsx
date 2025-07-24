"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserProfileForm } from "./user-profile-form";
import { Edit, User, Phone } from "lucide-react";

interface UserProfileDisplayProps {
  userProfile: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string | null | undefined;
  } | null;
  accessToken: string | undefined;
}

export function UserProfileDisplay({
  userProfile,
  accessToken,
}: UserProfileDisplayProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    // Optionally trigger a page refresh or update local state
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <div>
          <CardTitle className="text-3xl tracking-tight">
            Profile Information
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your personal information and contact details.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile information here. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <UserProfileForm
              initialData={userProfile}
              accessToken={accessToken}
              onSuccess={handleFormSuccess}
              onCancel={handleCancel}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />
                First Name
              </div>
              <div className="text-lg font-medium">
                {userProfile?.firstName || "---"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />
                Last Name
              </div>
              <div className="text-lg font-medium">
                {userProfile?.lastName || "---"}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Phone className="h-4 w-4" />
              Phone Number
            </div>
            <div className="text-lg font-medium">
              {userProfile?.phoneNumber || "---"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
