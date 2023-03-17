import * as Yup from "yup"


export const signupSchema = Yup.object({
  Name: Yup.string().min(2).max(25).required("Please Enter Your Name"),
  email: Yup.string().email().required("Email Is Required"),
  password: Yup.string().min(6).required("Please Enter Your Password"),
  confirm_password: Yup.string()
  .required("Please Confirm Your Password")
  .oneOf([Yup.ref("password"),null], "Password Must Match"),
  
})

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email Is Required"),
  password: Yup.string().min(6).required("Please Enter Your Password"),
  
})