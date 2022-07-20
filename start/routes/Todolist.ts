import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ShowTodolistController.showTodolistAction')
  Route.post('/create', 'CreateItemController.createItemAction')
  Route.get('/items/done', 'GetDoneItemsController.getDoneItemsAction')
  Route.get('/items/not-done', 'GetNotDoneItemsController.getNotDoneItemsAction')
  Route.delete('/delete/:id', 'DeleteItemController.deleteItemAction').where('id', /\d+/)
  Route.get('/notes/:task', 'GetNotesController.getNotesAction').where('task', /\d+/)
  Route.put('/switch/:id', 'SwitchItemController.switchItemAction').where('id', /\d+/)
})
  .prefix('/todolist')
  .namespace('App/Controllers/Todolist')
  .middleware('auth')

Route.get('/', ({ response }) => {
  response.redirect().toRoute('ShowTodolistController.showTodolistAction')
})
