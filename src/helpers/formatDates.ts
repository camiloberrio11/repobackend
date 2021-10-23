export function fixMongoDate (date: string) {
  const today = new Date(date)
  let fixDate = today.setHours(today.getHours() - 5)
  let res = new Date(fixDate)
  return res.toISOString()
}
