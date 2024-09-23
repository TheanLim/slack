import { atom, useAtom } from "jotai";

const modalState = atom(false); // Global State

export const useCreateWorkspaceModal = () => {
    return useAtom(modalState);
}