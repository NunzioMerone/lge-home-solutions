export type WindowComfortId = 'quiet' | 'temperature' | 'daylight'

export interface WindowComfortTopic {
  id: WindowComfortId
  label: string
  heading: string
  description: string
  detail: string
}

export interface ComfortSelectorIconProps {
  topic: WindowComfortId
}
