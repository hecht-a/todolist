import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from '@adonisjs/fold'
import FindItemsOnDate from 'App/Services/todolist/FindItemsOnDate'

@inject()
export default class ShowModalItemsController {
  constructor(private findItemsOnDate: FindItemsOnDate) {}
  public async showModalItemsAction({ auth, params, view }: HttpContextContract) {
    const { year, month, day } = params

    const tasks = await this.findItemsOnDate.invoke(auth, year, month, day)

    if (tasks.length === 0) {
      return view.render('calendar/no-events')
    }

    return view.render('calendar/tasks', {
      tasks,
    })
  }
}
