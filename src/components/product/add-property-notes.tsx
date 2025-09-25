import { auth } from "@/auth";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PropertyNotesWrapperDialog } from "./property-notes-wrapper";
import { ListPropertyNoteForm } from "./property-notes-dialog";
import { NoteObject } from "@/types";
import { cn } from "@/lib/utils";

interface AddPropertyNoteProps {
  propertyId: number;
  reference: string;
  notes: NoteObject[];
  styleClassname?: string;
  children?: React.ReactNode;
}

export const AddPropertyNote = async ({
  propertyId,
  reference,
  notes,
  styleClassname,
  children
}: AddPropertyNoteProps) => {

  const session = await auth();
  const token = session?.accessToken;
  return (
    <>
      {token ? (
        <>
          
          <PropertyNotesWrapperDialog customTrigger={children} propertyId={propertyId} reference={reference} styleClassname={styleClassname}>
            <ListPropertyNoteForm
              propertyId={propertyId}
              reference={reference}
              notes={notes}
            />
          </PropertyNotesWrapperDialog>
        </>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-transparent !p-2 h-6 w-6 rounded-full hover:bg-transparent shadow-2xl"
              type="button"
            >
              <Pencil className={cn("size-5 text-white shadow-2xl", styleClassname)} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add a note for property {reference}</DialogTitle>
              <DialogDescription>
                You can keep a note for this property.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <p>You need to be Logged into your account to add a note</p>
              <Button asChild className="bg-primary text-white">
                <Link href="/login">Login</Link>
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
