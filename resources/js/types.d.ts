import { Notyf } from 'notyf'
import { Calendar } from './Calendar'

export declare global {
  interface Window {
    notyf: Notyf
    calendar: Calendar
  }
}
