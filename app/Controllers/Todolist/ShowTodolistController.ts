import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from '@adonisjs/fold'
import FindItemsByUser from 'App/Services/todolist/FindItemsByUser'
import FormatDateFromParams from 'App/Services/todolist/FormatDateFromParams'

@inject()
export default class ShowTodolistController {
  constructor(
    private findItemsByUser: FindItemsByUser,
    private formatDateFromParams: FormatDateFromParams
  ) {}

  public async showTodolistAction({ auth, view, request }: HttpContextContract) {
    const items = await this.findItemsByUser.invoke(auth)
    const { date } = request.qs()

    return view.render('todolist/index', { items, date: this.formatDateFromParams.invoke(date) })
  }
}
