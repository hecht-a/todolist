import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BuildCalendar from 'App/Services/Calendar/BuildCalendar'
import { inject } from '@adonisjs/fold'
import Capitalize from 'App/Services/Capitalize'
import GetTasksOnDay from 'App/Services/Calendar/GetTasksOnDay'

@inject()
export default class ShowCalendarController {
  constructor(
    private buildCalendar: BuildCalendar,
    private capitalize: Capitalize,
    private getTasksOnDay: GetTasksOnDay
  ) {}

  public async showCalendarAction({ auth, view }: HttpContextContract) {
    const calendar = this.buildCalendar.invoke()

    if (!calendar) {
      return
    }

    return view.render('calendar/index', {
      calendar: {
        month: this.capitalize.invoke(calendar.month),
        days: await this.getTasksOnDay.invoke(auth, calendar),
      },
    })
  }
}
