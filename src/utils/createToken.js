import crypto from 'node:crypto'

export function createTokenVerification() {
  return crypto
    .randomBytes(16)
    .toString('hex')
    .match(/.{1,8}/g)
    .join('-')
}

export function tokenExpiryDate() {
  return new Date(Date.now() + 1800000)
}
