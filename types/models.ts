export interface IWork {
  _id: string,
  title: string,
  company: string,
  companyWebsite: string,
  location: string,
  jobPosition: string,
  startDate: Date,
  endDate: Date,
  descriptionPoints: string[],
  createdAt: Date,
}