import Cookie from 'js-cookie'

function getTokensFromUrl () {
  const raw = window.location.hash
  if (raw) {
    for (const param of raw.replace('#', '').split('&')) {
      const [key, value] = param.split('=')
      Cookie.set(key, value, { expires: 1 / 24 })
    }
    return Cookie.get()
  }
}

export {
  getTokensFromUrl
}
