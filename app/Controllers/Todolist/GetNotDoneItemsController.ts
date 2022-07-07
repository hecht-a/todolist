import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FindItemsByUser from 'App/Services/todolist/FindItemsByUser'
import { inject } from '@adonisjs/fold'

@inject()
export default class GetNotDoneItemsController {
  constructor(private findItemsByUser: FindItemsByUser) {}

  public async getNotDoneItemsAction({ auth, view }: HttpContextContract) {
    const items = await this.findItemsByUser.invoke(auth)

    return view.render('todolist/notDoneItems', { items })
  }
}
