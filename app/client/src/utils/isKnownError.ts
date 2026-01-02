import { IKnownError } from "../models";

export default function isKnownError(error: unknown): error is IKnownError {
    return (
        typeof error === "object" &&
        error !== null &&
        "knownError" in error &&
        (error as any).knownError === true
    );
}
