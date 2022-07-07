import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note'
import { bind } from '@adonisjs/route-model-binding'

export default class GetNoteController {
  @bind()
  public async getNoteAction({}: HttpContextContract, note: Note) {
    return note
  }
}
