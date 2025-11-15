export interface user {
  id?: string
  chinese_name: string
  mobile_number_personal?: string
  email: string
  job_title: string
  employedDate: null | Date
  attendanceDay: string[]
  team: string
  approver?: string
  punchIn: boolean
  salary: number
  laborFee: number
  healthFee: number
  retirementRate: number
  account: string
  role: string
}
