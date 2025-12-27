import { IKnownError } from "iarsenic-types";

export default function isKnownError(error: unknown): error is IKnownError {
    console.log('--------------------------------')
    console.log(error)
    console.log((
        typeof error === "object" &&
        error !== null &&
        "knownError" in error &&
        (error as any).knownError === true
    ))
    console.log('--------------------------------')
    return (
        typeof error === "object" &&
        error !== null &&
        "knownError" in error &&
        (error as any).knownError === true
    );
}
