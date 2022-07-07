import type { Dayjs } from 'dayjs'
import dayjs from 'App/Singletons/Dayjs'
import { inject } from '@adonisjs/fold'
import AddZeros from 'App/Services/AddZeros'
import { BuiltCalendar, Calendar, Day, Span, Time } from 'Types/Calendar'

@inject()
export default class BuildCalendar {
  constructor(private addZeros: AddZeros) {}

  public invoke(): Calendar | null {
    const currentDay = dayjs()
    const days = this.getDaysInMonth(currentDay.month(), currentDay.year())

    if (!days) {
      return null
    }

    let formattedDays: Day[] = days.filter(Boolean).map((day) => ({
      day: this.addZeros.invoke(day.date()),
      month: this.addZeros.invoke(day.month() + 1),
      year: day.year(),
    }))

    let calendar: BuiltCalendar = []
    const firstDayOfMonth =
      dayjs(new Date(currentDay.year(), currentDay.month())).startOf('month').day() || 7

    if (firstDayOfMonth > 1) {
      const notInMonth = Array.from<Span>({ length: firstDayOfMonth - 1 }).fill({
        type: 'span',
      })

      calendar = [
        ...notInMonth,
        ...formattedDays.map<Time>((day) => {
          const date = dayjs(new Date(day.year, parseInt(day.month) - 1, parseInt(day.day)))
          const classes = date.isToday() ? ['selected'] : []

          if (this.isBeforeToday(date)) {
            classes.push('disabled')
            classes.push('over')
          }

          return {
            type: 'time',
            day,
            classes,
          }
        }),
      ]
    }

    return {
      month: currentDay.format('MMMM'),
      days: calendar,
    }
  }

  private getDaysInMonth(month: number, year: number) {
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

  private isBeforeToday(date: Dayjs) {
    const today = dayjs()
    return (
      !date.isToday() &&
      date.date() < today.date() &&
      date.month() === today.month() &&
      date.year() === today.year()
    )
  }
}
