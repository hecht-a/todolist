import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Note from 'App/Models/Note'

export default class FindNotesByUser {
  public async invoke(auth: AuthContract) {
    return Note.query().select().where('owner', auth.user!.id)
  }
}
