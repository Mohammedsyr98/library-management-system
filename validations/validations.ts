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

export const BookFormSchema = yup.object({
  title: yup
    .string()
    .required("Book title is required")
    .max(150, "Title cannot exceed 150 characters"),

  author: yup
    .string()
    .required("Author name is required")
    .max(100, "Author name cannot exceed 100 characters"),

  genre: yup.string().required("Genre is required"),

  totalBooks: yup
    .number()
    .typeError("Total number of books must be a number")
    .required("Total number of books is required")
    .integer("Total books must be an integer")
    .min(1, "At least 1 book is required"),

  image: yup
    .mixed<File>()
    .nullable()
    .defined("Book image is required")
    .test("required", "Book image is required", (value) => value !== null),

  summary: yup
    .string()
    .required("Summary is required")
    .max(2000, "Summary cannot exceed 2000 characters"),
});
