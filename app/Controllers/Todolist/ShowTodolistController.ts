import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from '@adonisjs/fold'
import FindItemsByUser from 'App/Services/todolist/FindItemsByUser'

@inject()
export default class ShowTodolistController {
  constructor(private findItemsByUser: FindItemsByUser) {}

  public async showTodolistAction({ auth, view }: HttpContextContract) {
    const items = await this.findItemsByUser.invoke(auth)

    return view.render('todolist/index', { items })
  }
}
