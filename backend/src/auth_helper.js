const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const auth = (options = {}) => {
  const { secret, expiresIn } = options
  return {
    encrypt: (text) => {
      const cipher = crypto.createCipher('aes-256-ctr', secret)
      let enc = cipher.update(text, 'utf8', 'hex')
      enc += cipher.final('hex')
      return enc
    },
    decrypt: (text) => {
      const decipher = crypto.createDecipher('aes-256-ctr', secret)
      let dec = decipher.update(text, 'hex', 'utf8')
      dec += decipher.final('utf8')
      return dec
    },
    sign: (username, password) => {
      const payload = {
        username,
        info: encrypt(password),
      }
      return jwt.sign(payload, secret, { expiresIn: expiresIn })
    },
    verify: (token) => {
      jwt.verify(token, secret)
    }
  }
}

module.exports = auth
