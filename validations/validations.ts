import * as yup from "yup";
export const signUpSchema = yup
  .object({
    full_name: yup
      .string()
      .required("Full name is required")
      .test(
        "full-name",
        "Please enter your full name (first and last name)",
        (value) => {
          if (!value) return false;
          return value.trim().split(" ").length >= 2;
        }
      ),
    email: yup.string().email("Invalid email").required("Email is required"),
    university_id: yup.number().required("University ID is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

export const signInSchema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),

    password: yup.string().required("Password is required"),
  })
  .required();
