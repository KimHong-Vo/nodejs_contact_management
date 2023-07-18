import crypto from 'crypto'
export const constants = {
    VALIDATION_ERROR: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
    FORBIDDEN: 403
}

export const encryptCipher = crypto.createCipheriv('aes-128-cbc', process.env.CYPHER_KEY)