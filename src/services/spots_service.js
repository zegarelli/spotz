async function getPlaces () {
  let resp
  try {
    resp = await window.fetch('http://localhost:9000/places/')
    return await resp.json()
  } catch (err) {
    console.error(err)
    return {}
  }
}

module.exports = {
  getPlaces
}
