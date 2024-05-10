import * as crypto from 'crypto';

const CRYPTO_SECRET = "PAPA_CON_QUESO_2";
const CRYPTO_ALGORITHM = 'aes-128-gcm';

const IV_LENGTH = 16;


export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(CRYPTO_ALGORITHM, CRYPTO_SECRET, iv);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${crypted}`;
}

export function decrypt(text: string): string {
    const [ivHex, authTagHex, encrypted] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const paddedKey = Buffer.concat([Buffer.from(CRYPTO_SECRET), Buffer.from(CRYPTO_SECRET)]).slice(0, 16);

    const decipher = crypto.createDecipheriv(CRYPTO_ALGORITHM, paddedKey, iv);
    decipher.setAuthTag(authTag);
    let dec = decipher.update(encrypted, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}