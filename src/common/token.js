import Cookie from 'js-cookie'
const jwt = require('jsonwebtoken')
const jwkToPem = require('jwk-to-pem')
const jwk = require('./jwks.json')

function getToken (name) {
  const token = Cookie.get(name) ? Cookie.get(name) : null
  return token
}

async function getDecodedToken (name) {
  const token = await getToken(name)
  if (token && token !== 'undefined') {
    const pem = jwkToPem(jwk.keys[0])
    const decodedToken = await jwt.verify(token, pem, { algorithms: ['RS256'] })
    return decodedToken
  }
}

function getTokenFromUrl () {
  const token = getToken('id_token')
  if (!token) {
    const raw = window.location.hash
    if (raw) {
      for (const param of raw.replace('#', '').split('&')) {
        const [key, value] = param.split('=')
        Cookie.set(key, value, { expires: 1 / 24 })
      }
    }
  }
}

export {
  getToken,
  getTokenFromUrl,
  getDecodedToken
}
