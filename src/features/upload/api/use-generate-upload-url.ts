import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";
import { api } from "../../../../convex/_generated/api";

// Similar to ReactQuery or Convex's TanQuery (beta)
type ResponseType = string | null;
type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
}

export const useGenerateUploadUrl = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "settled" | "pending" | null>(null);

    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);

    const mutation = useMutation(api.upload.generateUploadUrl);
    const mutate = useCallback(async (values: {}, options?: Options) => {
        try {
            setData(null);
            setError(null);
            setStatus("pending");

            const response = await mutation();
            options?.onSuccess?.(response);
            return response;
        } catch (err) {
            setStatus("error")
            setError(err as Error);
            options?.onError?.(err as Error);
            if (options?.throwError) throw err;
        } finally {
            setStatus("settled");
            options?.onSettled?.();
        }
    }, [mutation])

    return {
        mutate,
        data,
        error,
        isPending,
        isSuccess,
        isError,
        isSettled,
    };
};