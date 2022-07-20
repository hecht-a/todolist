import '../css/app.scss'

import dayjs from 'dayjs'
import 'dayjs/locale/fr'

import Alpine from 'alpinejs'
import { Notyf } from 'notyf'
import { calendar, navbar, notes, todolist } from './alpine'

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
