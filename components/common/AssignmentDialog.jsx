import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { setTelecallersData } from "@/api/file_action";
import { useUserState } from "@/app/dashboard/store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { setTelecallersData } from "@/lib/actions/file_action";

export default function AssignmentDialog({ username }) {
  const userState = useUserState();
  const [url, setURL] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Assignment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Assignment</DialogTitle>
          <DialogDescription>
            Add the URL of new assignment and click Add button.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start gap-4">
          <Label htmlFor="name" className="text-right">
            Assignment URL
          </Label>
          <Input id="name" onChange={(e) => setURL(e.target.value)} />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              userState.user.getIdToken().then((token) => {
                console.log(token);
                setTelecallersData(token, username, url);
              });
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
