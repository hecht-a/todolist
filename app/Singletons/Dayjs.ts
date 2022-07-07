import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'
import isToday from 'dayjs/plugin/isToday'

dayjs.locale(fr)
dayjs.extend(isToday)

export default dayjs
