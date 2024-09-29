import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

// This is a Generic Confirmation Hook and Modal
export const useConfirm = (
    title: string,
    message: string,
): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);
    // confirm() returns a Promise object
    // Usually we use Promise's constructor to define what 
    // to do when succeed (resolve) and fail (reject). 
    // Both resolve(returnValue) and reject(returnValue) returns the value back to caller
    // Ex:
    // const fetchUserData = (userId) => {
    //     return new Promise((resolve, reject) => {
    //         // Fetch user data from a public API
    //         fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    //             .then((response) => {
    //                 if (!response.ok) {
    //                     throw new Error('Network response was not ok');
    //                 }
    //                 return response.json(); // Convert response to JSON
    //             })
    //             .then((userData) => {
    //                 resolve(userData); // Resolve the promise with the user data
    //             })
    //             .catch((error) => {
    //                 reject(`Error fetching user data: ${error.message}`); // Reject on error
    //             });
    //     });
    // };
    // In this case, we instead store the predefined resolve() into the state `promise`
    // Later in handleCancel and handleConfirm, we can resolve(false) and resolve(true)
    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    }

    const ConfirmDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                    <Button
                        onClick={handleCancel}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [ConfirmDialog, confirm]
}