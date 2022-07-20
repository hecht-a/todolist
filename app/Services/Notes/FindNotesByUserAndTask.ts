import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import NoteItem from 'App/Models/NoteItem'
import Note from 'App/Models/Note'

export default class FindNotesByUserAndTask {
  public async invoke(auth: AuthContract, taskId: number): Promise<Note[]> {
    const noteItems = await NoteItem.query()
      .preload('note', (noteQuery) => {
        noteQuery.where('owner', auth.user!.id)
      })
      .andWhere('item_id', taskId)

    return noteItems.map((noteItem) => noteItem.note)
  }
}
