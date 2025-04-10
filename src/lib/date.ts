import dayjs, { type ConfigType } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isTodayPlugin from 'dayjs/plugin/isToday'

dayjs.extend(relativeTime)
dayjs.extend(isTodayPlugin)

export const formatTimeToNow = (date: ConfigType) => {
  if (!date) {
    return ''
  }
  return dayjs(date).fromNow()
}

export const isToday = (date: ConfigType) => {
  if (!date) {
    return false
  }
  return dayjs(date).isToday()
}
