import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FindItemByIdAndByUser from 'App/Services/todolist/FindItemByIdAndByUser'
import { inject } from '@adonisjs/fold'

@inject()
export default class SwitchItemController {
  constructor(private findItem: FindItemByIdAndByUser) {}

  public async switchItemAction({ auth, params, response }: HttpContextContract) {
    const item = await this.findItem.invoke(auth, params.id)

    if (!item) {
      return
    }

    item.state = !item.state
    try {
      item.save()

      return response.ok({
        type: 'success',
        message: 'État de la tâche changé.',
      })
    } catch {
      return response.badRequest({
        type: 'error',
        message: "Impossible de changer l'état cette tâche.",
      })
    }
  }
}
