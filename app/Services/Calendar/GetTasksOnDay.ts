import { Calendar } from 'Types/Calendar'
import { inject } from '@adonisjs/fold'
import FindItemsOnDate from 'App/Services/todolist/FindItemsOnDate'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'

@inject()
export default class GetTasksOnDay {
  constructor(private findItemsOnDate: FindItemsOnDate) {}

  public async invoke(auth: AuthContract, calendar: Calendar) {
    return calendar.days.map(async (date) => {
      if (date.type === 'span') {
        return date
      }

      const {
        day: { day, month, year },
      } = date

      return {
        ...date,
        tasks: await this.findItemsOnDate.invoke(auth, year, parseInt(month), parseInt(day)),
      }
    })
  }
}
