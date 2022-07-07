import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { fetchApi } from '../helpers/fetchApi'

dayjs.extend(customParseFormat)

const fetchTasks = async (day: string) => {
  const modal = document.querySelector('.modal')!
  const eventsContainer = modal.querySelector('.events__container')!

  const date = day.split('/').reverse().join('/')
  const response = await fetch(`/calendar/${date}`)
  eventsContainer.innerHTML = await response.text()
}

function reloadCalendar() {
  fetch('/calendar/days')
    .then((response) => response.text())
    .then((data) => {
      const calendar = document.querySelector('#calendar #calendar-grid')!
      calendar.outerHTML = data
    })
}

async function reloadModal() {
  const modale: HTMLElement = document.querySelector('.modal')!
  const modaleDate = modale.dataset.date

  await fetchTasks(modaleDate!)
}

export default () => ({
  isOpen: false,
  show(e: PointerEvent) {
    this.isOpen = true

    let element = e.target as HTMLElement

    while (element.nodeName !== 'TIME') {
      element = element.parentElement!
    }

    this.fetchTasks(element.id)

    const date = dayjs(element.id, 'DD/MM/YYYY').format('dddd DD MMMM YYYY')
    const modal: HTMLElement = document.querySelector('.modal')!
    modal.dataset.date = element.id
    modal.querySelector('.modal__title')!.textContent = date
  },
  hide() {
    this.isOpen = false

    const modal: HTMLElement = document.querySelector('.modal')!
    modal.dataset.date = ''
  },
  fetchTasks,
  deleteTask(e) {
    const { itemid } = e.target.parentNode.dataset

    fetchApi(
      `/todolist/delete/${itemid}`,
      { method: 'delete' },
      { callback: [reloadCalendar, reloadModal], notif: true }
    )
  },
  switchState(e) {
    const { itemid } = e.target.parentNode.parentNode.dataset

    fetchApi(
      `/todolist/switch/${itemid}`,
      { method: 'put' },
      { notif: false, callback: [reloadCalendar, reloadModal] }
    )
  },
})
