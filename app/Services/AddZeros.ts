export default class AddZeros {
  public invoke(number: number): string {
    return number >= 10 ? number.toString() : `0${number}`
  }
}
