export function createTokenVerification() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function tokenExpiryDate() {
  return new Date(Date.now() + 1800000)
}
