import '../css/app.scss'

import dayjs from 'dayjs'
import 'dayjs/locale/fr'

import Alpine from 'alpinejs'
import calendar from './alpine/calendar'
import notes from './alpine/notes'
import todolist from './alpine/todolist'
import navbar from './alpine/navbar'
import { Notyf } from 'notyf'

Alpine.data('todolist', todolist)
Alpine.data('notes', notes)
Alpine.data('calendar', calendar)
Alpine.data('navbar', navbar)

Alpine.start()

dayjs.locale('fr')

window.notyf = new Notyf({
  position: { x: 'right', y: 'top' },
  duration: 2000,
  ripple: false,
})

// import { Calendar } from './Calendar'
// const calendarElement = document.querySelector<HTMLDivElement>('#calendar')
// if (calendarElement) {
//   window.calendar = new Calendar(calendarElement, {
//     min: new Date(),
//     max: new Date(new Date().getFullYear() + Infinity, 10),
//   })
// }
