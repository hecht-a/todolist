import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.put('/:note', 'EditNoteController.editNoteAction').where('note', /\d+/)
  Route.get('/', 'ShowNotesController.showNotesAction')
  Route.get('/sidebar', 'GetSidebarController.getSidebarAction')
  Route.get('/:note', 'GetNoteController.getNoteAction').where('note', /\d+/)
  Route.post('/', 'CreateNoteController.createNoteAction')
  Route.delete('/delete/:note', 'DeleteNoteController.deleteNoteAction').where('note', /\d+/)
})
  .namespace('App/Controllers/Notes')
  .prefix('/notes')
  .middleware('auth')
