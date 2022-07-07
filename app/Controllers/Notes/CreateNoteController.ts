import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NoteValidator from 'App/Validators/Notes/NoteValidator'
import Note from 'App/Models/Note'

export default class CreateNoteController {
  public async createNoteAction({ auth, response, request }: HttpContextContract) {
    try {
      const payload = await request.validate(NoteValidator)
      await Note.create({ ...payload, owner: auth.user!.id })

      return response.created({
        type: 'success',
        message: 'Note créée avec succès.',
      })
    } catch {
      return response.badRequest({
        type: 'error',
        message: 'Impossible de créer cette note.',
      })
    }
  }
}
