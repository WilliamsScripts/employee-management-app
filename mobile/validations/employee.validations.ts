import * as yup from "yup"

export const employeeValidation = yup.object({
  name: yup.string().required("Please enter employee's name"),
  jobRole: yup.string().required("Please enter employee's role"),
  department: yup.string().required("Please enter employee's department"),
  startDate: yup.date().required("Please enter employee's startDate"),
  birthday: yup.date().required("Please enter employee's startDate"),
}).required()
