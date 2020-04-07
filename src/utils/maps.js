function activitiesToItems (activities) {
  const items = []
  let count = 0
  for (const activity of activities) {
    items.push({
      childKey: count,
      image: '/images/bitmoji.png',
      header: activity.name,
      description: `${activity.name} created by: ${activity.created_by}`,
      meta: `Last Updated: ${activity.updated_at}`,
      extra: activity.created_at
    })
    count += 1
  }
  return items
}

module.exports = { activitiesToItems }
