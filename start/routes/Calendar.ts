import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ShowCalendarController.showCalendarAction')
  Route.get('/:year/:month/:day', 'ShowModalItemsController.showModalItemsAction')
    .where('year', /\d+/)
    .where('month', /\d+/)
    .where('day', /\d+/)
  Route.get('/days', 'GetCalendarDaysController.getCalendarDaysAction')
  Route.get('/modale', 'GetModaleController.getModaleAction')
})
  .namespace('App/Controllers/Calendar')
  .prefix('/calendar')
  .middleware('auth')
