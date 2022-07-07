import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Item from 'App/Models/Item'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/fold'
import FormatItemsByStartField from 'App/Services/todolist/FormatItemsByStartField'

@inject()
export default class FindItemsByUserAndByDate {
  constructor(private formatItemsByField: FormatItemsByStartField) {}

  public async invoke(auth: AuthContract, year: number, month: number) {
    const items = await Item.query()
      .where('user_id', auth.user!.id)
      .andWhere('start', '>=', DateTime.fromJSDate(new Date(year, month, 1)).toSQLDate())
      .andWhere('end', '<', DateTime.fromJSDate(new Date(year, month + 1, 1)).toSQLDate())
      .orderBy('start')

    return this.formatItemsByField.invoke(items)
  }
}
