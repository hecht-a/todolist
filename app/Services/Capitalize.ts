export default class Capitalize {
  public invoke(string: string) {
    return string[0].toUpperCase() + string.slice(1, string.length)
  }
}
