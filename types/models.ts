export interface IWork {
  _id: string,
  keyPoint: string,
  company: string,
  companyWebsite: string,
  location: string,
  jobPosition: string,
  startDate: string,
  endDate?: string,
  descriptionPoints: string[],
  createdAt: string,
}

export interface IWorkPrepared {
  keyPoint: string,
  company: string,
  companyWebsite: string,
  location: string,
  jobPosition: string,
  startDate: string,
  endDate: string | undefined,
  descriptionPoints: string[],
}