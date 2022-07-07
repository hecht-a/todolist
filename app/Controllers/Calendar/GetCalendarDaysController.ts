import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BuildCalendar from 'App/Services/Calendar/BuildCalendar'
import GetTasksOnDay from 'App/Services/Calendar/GetTasksOnDay'
import { inject } from '@adonisjs/fold'

@inject()
export default class GetCalendarDaysController {
  constructor(private buildCalendar: BuildCalendar, private getTasksOnDay: GetTasksOnDay) {}

  public async getCalendarDaysAction({ auth, view }: HttpContextContract) {
    const calendar = this.buildCalendar.invoke()

    if (!calendar) {
      return
    }

    return view.render('calendar/days', {
      days: await this.getTasksOnDay.invoke(auth, calendar),
    })
  }
}
