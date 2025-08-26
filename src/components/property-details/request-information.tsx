import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LiaEdit } from "react-icons/lia";
import { Button } from "../ui/button";
import { Property } from "@/types/property";
import ContactAgentForm from "./contact-agent-form";

interface RequestInformationDialogProps {
  salesConsultant: Property["sales_consultant"];
  children?: React.ReactNode;
}

const RequestInformationDialog: React.FC<RequestInformationDialogProps> = ({
  salesConsultant,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button
            type="button"
            className="text-sm font-semibold w-full rounded-none bg-white text-black !px-6 hover:text-white hover:bg-black transition-all"
          >
            <LiaEdit className="h-3 w-3" />
            REQUEST INFORMATION
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        showCloseButton={true}
        closeButtonStyles="bg-white"
        className="border-primary h-full overflow-y-auto py-10 bg-black"
      >
        <div>
          <DialogHeader>
            <DialogTitle className="text-white text-center">
              Contact Sales Consultant
            </DialogTitle>
          </DialogHeader>
          <div className="px-2 py-4  ">
            <ContactAgentForm salesConsultant={salesConsultant} />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestInformationDialog;
