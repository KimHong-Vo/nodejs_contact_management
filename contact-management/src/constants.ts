import crypto from 'crypto'
export const responseStatuses = {
    VALIDATION_ERROR: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
    FORBIDDEN: 403,
    OK: 200
}

export const myCrypto = {
    ALGORITHM: 'aes-256-cbc',
    KEY: crypto.randomBytes(32),
    IV: crypto.randomBytes(16)
}

export const ACCESSTOKEN_SECRET = '@admin123@'
