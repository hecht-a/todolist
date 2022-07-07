import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FindItemByIdAndByUser from 'App/Services/todolist/FindItemByIdAndByUser'
import { inject } from '@adonisjs/fold'

@inject()
export default class DeleteItemController {
  constructor(private findItem: FindItemByIdAndByUser) {}

  public async deleteItemAction({ auth, params, response }: HttpContextContract) {
    const item = await this.findItem.invoke(auth, params.id)

    if (!item) {
      return response.unprocessableEntity({
        type: 'error',
        message: 'Tâche introuvable.',
      })
    }

    try {
      await item.delete()

      return response.ok({
        type: 'success',
        message: 'Tâche supprimée avec succès.',
      })
    } catch {
      return response.badRequest({
        type: 'error',
        message: 'Impossible de supprimer cette tâche.',
      })
    }
  }
}
