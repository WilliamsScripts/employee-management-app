import moment from "moment"

export const formatDate = (payload?: string | Date) => {
  if (payload) return moment(payload).format("DD-MM-yyyy")
}