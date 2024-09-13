export interface IMissionItem {
  isChecked: boolean
  name: string
  point: number
  time: number
}

export interface IItemMissionPartner {
  description: string
  id: number
  image: string
  name: string
  point: number
  status: null | string
  type: string
  url: string
  xp: number
}
export interface IMissionPartner {
  description: string
  image: null | string
  missions: IItemMissionPartner[]
  name: string
  participants: number
  rewards: string
}
export interface IQuizAnswerItem {
  correct: boolean
  index: number
  text: string
}
export interface IQuizItem {
  answers: Array<IQuizAnswerItem>
  index: number
  isMultiple: boolean
  question: string
}

export interface IMissionQuiz {
  box: number
  description: string
  id: number
  image: string
  name: string
  point: number
  quizArrays: IQuizItem[]
  status: null | string
  type: string
  url: string
  xp: number
}
