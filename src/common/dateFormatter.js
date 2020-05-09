const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function getOrdinal (dayNum) {
  const st = [1, 21, 21]
  const nd = [2, 22]
  const rd = [3, 23]
  const th = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28, 28, 30]
  if (st.includes(dayNum)) {
    return 'st'
  } else if (nd.includes(dayNum)) {
    return 'nd'
  } else if (rd.includes(dayNum)) {
    return 'rd'
  } else if (th.includes(dayNum)) {
    return 'th'
  }

  return ''
}

function getFormattedDate (date, prefomattedDate = false, hideYear = false) {
  const day = date.getDate()
  const month = MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours()
  let minutes = date.getMinutes()

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${prefomattedDate} at ${hours}:${minutes}`
  }

  if (hideYear) {
    // January 10th at 10:20
    return `${month} ${day}${getOrdinal(day)} at ${hours}:${minutes}`
  }

  // January 10th 2017. at 10:20
  return `${month} ${day}${getOrdinal(day)}, ${year} at ${hours}:${minutes}`
}

// --- Main function
function formatDate (dateParam) {
  if (!dateParam) {
    return null
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam)
  const DAY_IN_MS = 86400000 // 24 * 60 * 60 * 1000
  const today = new Date()
  const yesterday = new Date(today - DAY_IN_MS)
  const seconds = Math.round((today - date) / 1000)
  const minutes = Math.round(seconds / 60)
  const isToday = today.toDateString() === date.toDateString()
  const isYesterday = yesterday.toDateString() === date.toDateString()
  const isThisYear = today.getFullYear() === date.getFullYear()

  if (seconds < 5) {
    return 'just now'
  } else if (seconds < 60) {
    return `${seconds} seconds ago`
  } else if (seconds < 90) {
    return 'about a minute ago'
  } else if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (isToday) {
    return getFormattedDate(date, 'Today') // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday') // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true) // January 10th, at 10:20
  }

  return getFormattedDate(date) // January 10th, 2017. at 10:20
}

module.exports = {
  getOrdinal,
  formatDate
}
