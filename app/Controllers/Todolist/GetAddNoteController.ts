import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetAddNoteController {
  public async getAddNoteAction({ view }: HttpContextContract) {
    return view.render('todolist/addNote')
  }
}
