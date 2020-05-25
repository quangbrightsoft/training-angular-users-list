export interface User {
  createdAt: string
  deletedAt: string
  email: string
  fullName: string
  id: number
  isDeleted: boolean
  isDisabled: boolean
  leaves: []
  medicalNote: string
  personalId: number
  roles: string[]
  sex: string
  skillIds: []
  skills: []
  ssn: string
  updatedAt: string
  userName:string
}

export interface PagedData<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[]
}