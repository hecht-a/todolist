import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from '@adonisjs/fold'
import FindNotesByUser from 'App/Services/Notes/FindNotesByUser'

@inject()
export default class GetSidebarController {
  constructor(private findNotesByUser: FindNotesByUser) {}

  public async getSidebarAction({ auth, view }: HttpContextContract) {
    const notes = await this.findNotesByUser.invoke(auth)

    return view.render('notes/sidebar', {
      notes,
    })
  }
}
