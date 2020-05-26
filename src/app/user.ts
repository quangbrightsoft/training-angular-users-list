export class User {
  createdAt: string
  deletedAt: string
  email: string
  fullName: string
  id: number
  isDeleted: boolean
  isDisabled: boolean
  leaves: []
  medicalNote: string
  personalId: string
  roles: string[]
  sex: string
  skillIds: []
  skills: []
  ssn: string
  updatedAt: string
  userName: string
  workTime: WorkTime
}
export class WorkTime {
  startTime: string
  endTime: string
  weekDays: number[]
}
export interface PagedData<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[]
}