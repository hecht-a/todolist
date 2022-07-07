export default class FormatDateFromParams {
  public invoke(date?: string) {
    if (!date) {
      return null
    }
    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}T00:00`
  }
}
