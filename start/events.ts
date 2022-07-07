/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'

Event.on('db:query', function ({ sql, bindings }) {
  Logger.info(`${sql} | [${bindings?.join(', ')}]`)
})
