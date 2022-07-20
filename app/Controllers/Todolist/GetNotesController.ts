import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FindNotesByUserAndTask from 'App/Services/Notes/FindNotesByUserAndTask'
import { inject } from '@adonisjs/fold'

@inject()
export default class GetNotesController {
  constructor(private findNotesByUserAndTask: FindNotesByUserAndTask) {}

  public async getNotesAction({ auth, view, params }: HttpContextContract) {
    const { task } = params
    const notes = await this.findNotesByUserAndTask.invoke(auth, task)

    return view.render('todolist/notes', {
      notes,
    })
  }
}
