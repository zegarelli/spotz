import Cookie from 'js-cookie'

function getSessionCookie () {
  const sessionString = Cookie.get('session')
  let session
  if (sessionString) {
    session = JSON.parse(sessionString)
  }
  return session
}

export default getSessionCookie
