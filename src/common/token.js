import Cookie from 'js-cookie'
const jwt = require('jsonwebtoken')
const jwkToPem = require('jwk-to-pem')
const jwk = require('./jwks.json')

async function getToken () {
  const token = Cookie.get('token') ? Cookie.get('token') : null
  return token
}

async function getDecodedToken () {
  const token = await getToken()
  if (token) {
    const pem = jwkToPem(jwk.keys[0])
    const decodedToken = await jwt.verify(token, pem, { algorithms: ['RS256'] })
    return decodedToken
  }
}

function setToken (token) {
  Cookie.set('token', token, { expires: 1 / 24 })
}

async function getTokenFromUrl () {
  const raw = window.location.hash
  let idToken
  for (const param of raw.replace('#', '').split('&')) {
    const [key, value] = param.split('=')
    if (key === 'id_token') {
      idToken = value
      break
    }
  }
  setToken(idToken)
  const token = await getDecodedToken()
  return token
}

export {
  getToken,
  setToken,
  getTokenFromUrl,
  getDecodedToken
}
