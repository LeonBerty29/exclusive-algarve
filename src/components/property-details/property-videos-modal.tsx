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
import { Play } from "lucide-react";
import PropertyVideoDetails from "../property/property-video-details";

const ProperyVideosModal = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-16 h-16 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center shadow-lg transition-all">
            <Play className="w-6 h-6 text-black ml-1" fill="black" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-fit mx-auto !max-w-full !top-16 !bottom-0 !left-0 !right-0 !translate-x-0 !translate-y-0 overflow-y-auto !bg-white">
          <DialogHeader>
            <DialogTitle className="sr-only">Property Video player</DialogTitle>
            <DialogDescription className="sr-only">
              Play videos of the property
            </DialogDescription>
          </DialogHeader>
          <div>
            <PropertyVideoDetails />
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
    </>
  );
};

export default ProperyVideosModal;
