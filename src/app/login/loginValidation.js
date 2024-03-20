import * as Yup from "yup";




export const loginValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("This field is required"),
  password: Yup.string()
  .min(8, 'Password must be at least 8 characters')
    .required("This field is required"),
});