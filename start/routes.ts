import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

import './routes/Auth'
import './routes/Calendar'
import './routes/Notes'
import './routes/Todolist'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
