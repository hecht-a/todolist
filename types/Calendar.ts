export type Day = {
  day: string
  month: string
  year: number
}

export type Span = { type: 'span' }

export type Time = {
  type: 'time'
  day: Day
  classes: string[]
}

export type BuiltCalendar = (Time | Span)[]

export type Calendar = { month: string; days: BuiltCalendar }
