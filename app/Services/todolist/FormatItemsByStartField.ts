import Item from 'App/Models/Item'
import { DateTime } from 'luxon'

export default class FormatItemsByStartField {
  public async invoke(items: Item[]) {
    return items.reduce((acc, curr) => {
      const date = DateTime.fromFormat(
        curr['start'] as unknown as string,
        'dd/MM/yyyy HH:mm'
      ).toFormat('dd/MM/yyyy')

      if (!acc[date]) {
        acc[date] = []
      }

      return { ...acc, [date]: [...acc[date], curr] }
    }, {})
  }
}
