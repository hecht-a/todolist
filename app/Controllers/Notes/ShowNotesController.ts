import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FindNotesByUser from 'App/Services/Notes/FindNotesByUser'
import { inject } from '@adonisjs/fold'

@inject()
export default class ShowNotesController {
  constructor(private findNotesByUser: FindNotesByUser) {}

  public async showNotesAction({ auth, view }: HttpContextContract) {
    const notes = await this.findNotesByUser.invoke(auth)
    return view.render('notes/index', {
      notes,
    })
  }
}
