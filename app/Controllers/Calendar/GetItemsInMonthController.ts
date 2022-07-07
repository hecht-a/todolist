import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from '@adonisjs/fold'
import FindItemsByUserAndByDate from 'App/Services/todolist/FindItemsByUserAndByDate'
import FindItemsOnDate from 'App/Services/todolist/FindItemsOnDate'

@inject()
export default class GetItemsInMonthController {
  constructor(
    private findItemsByUserAndByDate: FindItemsByUserAndByDate,
    private findItemsOnDate: FindItemsOnDate
  ) {}

  public async getItemsInMonthAction({ auth, params }: HttpContextContract) {
    const { year, month, day } = params

    if (!day) {
      return this.findItemsByUserAndByDate.invoke(auth, year, month)
    }

    return this.findItemsOnDate.invoke(auth, year, month, day)
  }
}
