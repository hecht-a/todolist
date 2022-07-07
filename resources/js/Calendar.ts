import type { Item, Options } from './typing'
import type { Dayjs } from 'dayjs'

import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { removeChildren } from './helpers/removeChildren'
import { fetchApi } from './helpers/fetchApi'

dayjs.extend(isToday)

type Day = {
  day: number
  month: number
  year: number
}

type Span = { type: 'span' }

type Time = {
  type: 'time'
  day: Day
  classes: string[]
}

type BuiltCalendar = (Time | Span)[]

export class Calendar {
  public static readonly days = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ]
  public static readonly months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ]

  private date: Dayjs
  private search: string
  private value: Dayjs
  private selectedDay: Dayjs | null

  private day: number
  private month: number
  private year: number

  private readonly min: Dayjs
  private readonly max: Dayjs

  private userElement: HTMLElement

  private readonly calendarWrapper: HTMLDivElement
  private readonly calendarElement: HTMLDivElement
  private readonly calendarHeader: HTMLElement
  private readonly calendarHeaderTitle: HTMLHeadingElement
  private readonly navigationWrapper: HTMLDivElement
  private readonly previousMonthArrow: HTMLAnchorElement
  private readonly nextMonthArrow: HTMLAnchorElement
  private readonly calendarGridDays: HTMLElement
  private readonly calendarGrid: HTMLElement
  private readonly eventsSection: HTMLElement
  private readonly calendarDayElementType: string

  private callback: (date: Dayjs) => void
  private activeDateElement: HTMLElement

  constructor(element: HTMLElement, options: Options) {
    this.date = dayjs(options.current ?? new Date())
    this.search = options.search ?? ''
    this.formatDateToInit(this.date)

    this.day = this.date.day()
    this.month = this.date.month()
    this.year = this.date.year()

    this.value = this.date

    this.min = dayjs(options.min)
    this.max = dayjs(options.max)
    this.formatDateToInit(this.min)
    this.formatDateToInit(this.max)

    this.userElement = element

    this.calendarWrapper = document.createElement('div')
    this.calendarElement = document.createElement('div')
    this.calendarHeader = document.createElement('header')
    this.calendarHeaderTitle = document.createElement('h4')
    this.navigationWrapper = document.createElement('div')
    this.previousMonthArrow = document.createElement('a')
    this.nextMonthArrow = document.createElement('a')
    this.calendarGridDays = document.createElement('section')
    this.calendarGrid = document.createElement('section')
    this.eventsSection = document.createElement('section')
    this.calendarDayElementType = 'time'

    this.calendarWrapper.id = 'calendar-wrapper'
    this.calendarElement.id = 'calendar-element'
    this.calendarGridDays.id = 'calendar-days'
    this.calendarGrid.id = 'calendar-grid'
    this.navigationWrapper.id = 'navigation-wrapper'
    this.previousMonthArrow.id = 'previous-month'
    this.nextMonthArrow.id = 'next-month'
    this.eventsSection.id = 'calendar-events'
    this.eventsSection.classList.add('modal')
    this.eventsSection.setAttribute('data-visible', 'false')

    this.insertHeaderIntoCalendarWrapper()
    this.insertCalendarGridDaysHeader()
    this.insertDaysIntoGrid()
    this.insertNavigationButtons()
    this.calendarWrapper.appendChild(this.calendarElement)

    this.initModal()
    document.querySelector('.container')!.appendChild(this.eventsSection)

    this.userElement.appendChild(this.calendarWrapper)
    this.initTasks()
  }

  public test() {
    const { search, selectedDay, day } = this
    console.log({ search, selectedDay, day })
  }

  public getDaysInMonth(month: number, year: number): Dayjs[] | void {
    if ((!month && month !== 0) || (!year && year !== 0)) {
      return
    }

    let date = dayjs(new Date(year, month, 1))
    const days: Dayjs[] = [date]

    while (days.length < date.daysInMonth()) {
      date = date.add(1, 'day')
      days.push(date)
    }

    return days
  }

  public formatDateToInit(date: Dayjs): void {
    if (!date) {
      return
    }

    date.hour(0)
    date.minute(0)
    date.second(0)
    date.millisecond(0)
  }

  public insertHeaderIntoCalendarWrapper(): void {
    this.calendarHeaderTitle.textContent = `${Calendar.months[this.month]} - ${this.year}`
    this.calendarHeader.appendChild(this.calendarHeaderTitle)
    this.calendarWrapper.appendChild(this.calendarHeader)
  }

  public insertCalendarGridDaysHeader(): void {
    Calendar.days.forEach((day) => {
      const dayElement = document.createElement('span')
      dayElement.textContent = day
      this.calendarGridDays.appendChild(dayElement)
    })
    this.calendarElement.appendChild(this.calendarGridDays)
  }

  public insertNavigationButtons(): void {
    const div = document.createElement('div')
    div.classList.add('btn-container')
    this.previousMonthArrow.innerHTML = '&lt;'
    this.previousMonthArrow.classList.add('btn')
    this.nextMonthArrow.innerHTML = '&gt;'
    this.nextMonthArrow.classList.add('btn')

    this.previousMonthArrow.setAttribute('aria-label', 'Go to previous month')
    this.nextMonthArrow.setAttribute('aria-label', 'Go to next month')

    div.appendChild(this.previousMonthArrow)
    div.appendChild(this.nextMonthArrow)

    this.navigationWrapper.appendChild(div)

    this.previousMonthArrow.addEventListener('click', () => {
      if (this.month === 0) {
        this.month = 11
        this.year -= 1
      } else {
        this.month -= 1
      }
      this.updateCalendar()
    })

    this.nextMonthArrow.addEventListener('click', () => {
      if (this.month === 11) {
        this.month = 0
        this.year += 1
      } else {
        this.month += 1
      }
      this.updateCalendar()
    })
    this.calendarHeader.appendChild(this.navigationWrapper)
  }

  public insertDaysIntoGrid(): void {
    this.calendarGrid.innerHTML = ''
    let days = this.getDaysInMonth(this.month, this.year) as (void | null | Dayjs)[]
    if (!days) {
      return
    }

    days = days.filter(Boolean)
    const firstDayOfMonth = dayjs(new Date(this.year, this.month)).startOf('month').day() || 7

    if (firstDayOfMonth > 1) {
      const notInMonth = Array.from<null>({ length: firstDayOfMonth - 1 }).fill(null)
      days = [...notInMonth, ...days]
    }

    for (const date1 of days) {
      if (date1 === null || !date1) {
        const blank = document.createElement('span')
        this.calendarGrid.appendChild(blank)
        continue
      }
      const dateElement = document.createElement(date1 ? this.calendarDayElementType : 'span')
      const pDay = document.createElement('p')
      const pEvents = document.createElement('p')
      const pEventsDone = document.createElement('p')
      pEvents.id = 'amount-events'
      pEventsDone.id = 'amount-events-done'
      dateElement.appendChild(pDay)
      dateElement.appendChild(pEvents)
      dateElement.appendChild(pEventsDone)
      const dateE = date1.date().toString()

      if (date1.isToday()) {
        this.activeDateElement = dateElement
      }

      dateElement.setAttribute('value', date1.format('DD/MM/YYYY'))
      dateElement.id = date1.format('DD/MM/YYYY')

      pDay.classList.add('number__day')
      pDay.textContent = date1 ? dateE : ''

      const handleSelectedEvent = (event) => {
        this.initModal()

        const modal = document.querySelector('.modal')
        modal?.setAttribute('data-visible', 'true')
        if (
          dateElement.nodeName.toLowerCase() === this.calendarDayElementType &&
          !dateElement.classList.contains('disabled')
        ) {
          document.querySelectorAll('.selected').forEach((element) => {
            element.classList.remove('selected')
          })
          event.target.classList.add('selected')
          this.value = dayjs(new Date(dateElement.getAttribute('value')!))
          this.onValueChange(this.callback)

          if (event.target.classList.contains('selected')) {
            let elem = event.target
            if (elem.tagName === 'P') {
              elem = elem.parentElement
            }
            const [date, month, year] = elem.getAttribute('value').split('/')
            this.selectedDay = dayjs(new Date(Number(year), Number(month) - 1, Number(date)))
          } else {
            this.selectedDay = null
          }
        }
        this.setTasks()
      }

      dateElement.addEventListener('click', handleSelectedEvent)

      if ((this.min || this.max) && !date1.isToday() && (date1 < this.min || date1 > this.max)) {
        dateElement.classList.add('disabled')
        dateElement.classList.add('over')
        dateElement.removeEventListener('click', handleSelectedEvent)
      }
      this.calendarGrid.appendChild(dateElement)
    }

    this.calendarElement.appendChild(this.calendarGrid)
    if (this.activeDateElement) {
      this.activeDateElement.classList.add('selected')
      const [date, month, year] = this.activeDateElement.getAttribute('value')!.split('/')
      this.selectedDay = dayjs(new Date(Number(year), Number(month) - 1, Number(date)))
    }
  }

  public updateCalendar(): void {
    this.date = dayjs(new Date(this.year, this.month))

    this.day = this.date.day()
    this.month = this.date.month()
    this.year = this.date.year()

    window.requestAnimationFrame(() => {
      this.calendarHeaderTitle.textContent = `${Calendar.months[this.month]} - ${this.year}`
      this.insertDaysIntoGrid()
      this.initTasks()
    })
  }

  public onValueChange(callback: (date: Dayjs) => void): void {
    if (this.callback) {
      return this.callback(this.value)
    }
    this.callback = callback
  }

  private initModal() {
    const div: HTMLDivElement = document.querySelector('#events') || document.createElement('div')
    div.id = 'events'
    if (div.children.length > 0) {
      removeChildren(div)
    }

    const closeModal = document.createElement('button')
    closeModal.classList.add('close__modal')
    closeModal.textContent = '✗'
    closeModal.addEventListener('click', () => {
      this.eventsSection.setAttribute('data-visible', 'false')
      removeChildren(this.eventsSection)
      if (this.search !== '') {
        if (this.search === 'dmy') {
          window.location.href = window.location.href.split('?')[0]
        }
        this.search = ''
      }
    })
    div.appendChild(closeModal)

    this.eventsSection.appendChild(div)
  }

  public async initTasks() {
    const fetchedTasks = await fetchApi<Record<string, Item[]>>(
      `/calendar/${this.year}/${this.month}`
    )
    if (!fetchedTasks) {
      return
    }

    for (const [date, tasks] of Object.entries(fetchedTasks)) {
      const dayElement = document.querySelector(`time[value='${date}']`)!
      const done = tasks.filter((task) => task.state)

      dayElement.querySelector(
        '#amount-events'
      )!.textContent = `${done.length.toString()} / ${tasks.length.toString()} finie(s)`
    }
  }

  public async setTasks() {
    const currentDay = this.selectedDay?.format('YYYY/MM/DD')
    const fetchedTasks = await fetchApi<Item[]>(`/calendar/${currentDay}`)
    if (!fetchedTasks) {
      return
    }
    const eventsContainer = document.createElement('div')
    eventsContainer.classList.add('events__container')

    const div: HTMLDivElement = document.querySelector('#events') || document.createElement('div')
    div.id = 'events'

    const date = document.createElement('h1')
    date.classList.add('modal__title')
    date.textContent = this.selectedDay!.format('dddd DD MMMM YYYY')
    if (this.search) {
      this.eventsSection.setAttribute('data-visible', 'true')
    }
    div.appendChild(date)

    if (fetchedTasks.length === 0) {
      const div = document.createElement('div')
      div.classList.add('no__events')
      const h3 = document.createElement('h3')
      h3.textContent = "Il n'y a pas d'événements pour ce jour."

      const date = this.selectedDay!.format('DD/MM/YYYY')
      const a = document.createElement('a')
      a.href = `/todolist?date=${date}`
      a.textContent = 'Ajouter un événement de jour'

      div.appendChild(h3)
      div.appendChild(a)
      eventsContainer.appendChild(div)
    }

    for (const { id, name, start, end, state, description } of fetchedTasks) {
      const event = document.createElement('div')
      event.classList.add('event')

      const li = document.createElement('li')
      li.classList.add(`todo-item`)
      if (state) {
        li.classList.add('done')
      }

      const inputState = document.createElement('input')
      inputState.type = 'checkbox'
      inputState.checked = state
      inputState.id = id.toString()
      li.appendChild(inputState)
      event.appendChild(li)

      const labelState = document.createElement('label')
      labelState.setAttribute('for', id.toString())
      labelState.classList.add('tick')
      labelState.addEventListener('click', () => {
        fetchApi(`/todolist/switch/${id}`, { method: 'put' }, { notif: false })
      })
      li.appendChild(labelState)

      const pName = document.createElement('p')
      pName.textContent = `Nom: ${name}`
      event.appendChild(pName)

      if (description !== null) {
        const pDescription = document.createElement('p')
        pDescription.textContent = `Description: ${description}`
        event.appendChild(pDescription)
      }

      const pStart = document.createElement('p')
      pStart.textContent = `Début: ${start}`
      event.appendChild(pStart)

      const pEnd = document.createElement('p')
      pEnd.textContent = `Fin: ${end}`
      event.appendChild(pEnd)

      const btnDelete = document.createElement('button')
      btnDelete.id = 'delete-task'
      btnDelete.addEventListener('click', () => {
        fetchApi(`/todolist/delete/${id}`, { method: 'delete' })
      })
      event.appendChild(btnDelete)

      eventsContainer.appendChild(event)
    }
    div.append(eventsContainer)
    this.eventsSection.appendChild(div)
  }

  public getCalendar(): BuiltCalendar {
    const currentDay = dayjs()
    const days = this.getDaysInMonth(currentDay.month(), currentDay.year())

    if (!days) {
      return []
    }

    let formattedDays: Day[] = days.filter(Boolean).map((day) => ({
      day: day.date(),
      month: day.month() + 1,
      year: day.year(),
    }))

    let calendar: BuiltCalendar = []
    const firstDayOfMonth = dayjs(new Date(this.year, this.month)).startOf('month').day() || 7

    if (firstDayOfMonth > 1) {
      const notInMonth = Array.from<Span>({ length: firstDayOfMonth - 1 }).fill({
        type: 'span',
      })

      calendar = [
        ...notInMonth,
        ...formattedDays.map<Time>((day) => ({
          type: 'time',
          day,
          classes: [],
        })),
      ]
    }
    console.log(calendar)

    return calendar
  }
}
