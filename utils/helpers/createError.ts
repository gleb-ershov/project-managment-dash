export const createError = (
    statusCode: number,
    message: string,
    error?: unknown,
    ownError?: boolean
) => {
    if (ownError) {
        return {
            status: statusCode,
            error: message,
            ok: false,
        }
    }

    if (error instanceof Error) {
        return {
            status: statusCode,
            error: error.message,
            ok: false,
        }
    } else if (typeof error === 'object' && error && 'message' in error) {
        return {
            status: statusCode,
            error: String(error.message),
            ok: false,
        }
    }
    return {
        status: statusCode,
        error: message,
        ok: false,
    }
}
