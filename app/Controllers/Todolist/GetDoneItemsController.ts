import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FindItemsByUser from 'App/Services/todolist/FindItemsByUser'
import { inject } from '@adonisjs/fold'

@inject()
export default class GetDoneItemsController {
  constructor(private findItemsByUser: FindItemsByUser) {}

  public async getDoneItemsAction({ auth, view }: HttpContextContract) {
    const items = await this.findItemsByUser.invoke(auth)

    return view.render('todolist/doneItems', { items })
  }
}
