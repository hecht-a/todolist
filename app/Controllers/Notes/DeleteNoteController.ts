import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note'
import { bind } from '@adonisjs/route-model-binding'

export default class DeleteNoteController {
  @bind()
  public async deleteNoteAction({ response }: HttpContextContract, note: Note) {
    try {
      await note.delete()

      return response.ok({
        type: 'success',
        message: 'Note supprimée avec succès.',
      })
    } catch {
      return response.badRequest({
        type: 'error',
        message: 'Impossible de supprimer cette note.',
      })
    }
  }
}
