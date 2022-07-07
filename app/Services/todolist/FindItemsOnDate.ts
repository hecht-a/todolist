import { DateTime } from 'luxon'
import Item from 'App/Models/Item'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'

export default class FindItemsOnDate {
  public async invoke(auth: AuthContract, year: number, month: number, day: number) {
    const target = new Date(year, month - 1, day)
    const targetCopy = new Date(target.getTime())
    targetCopy.setDate(target.getDate() + 1)

    return Item.query()
      .where('user_id', auth.user!.id)
      .andWhere('start', '>=', DateTime.fromJSDate(target).toSQL())
      .andWhere('start', '<', DateTime.fromJSDate(targetCopy).toSQL())
  }
}
