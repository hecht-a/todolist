import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NoteValidator from 'App/Validators/Notes/NoteValidator'

export default class EditNoteController {
  public async editNoteAction({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(NoteValidator)
    console.log(payload)
    try {
      console.log(payload, auth)
      // await Note.create({ ...payload, owner: auth.user!.id })

      return response.created({
        type: 'success',
        message: 'Note éditiée avec succès.',
      })
    } catch {
      return response.badRequest({
        type: 'error',
        message: "Impossible d'éditer cette note.",
      })
    }
  }
}
