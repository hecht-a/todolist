import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'
import ItemValidator from 'App/Validators/Todolist/ItemValidator'

export default class CreateItemController {
  public async createItemAction({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ItemValidator)
      await Item.create({ ...payload, userId: auth.user!.id })

      return response.created({
        type: 'success',
        message: 'Tâche créée avec succès.',
      })
    } catch {
      return response.badRequest({
        type: 'error',
        message: 'Impossible de créer cette tâche.',
      })
    }
  }
}
