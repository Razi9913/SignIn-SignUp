import * as Yup from 'yup'

const signUpSchema = Yup.object({
  fullName: Yup.string()
    .required("Name is Required")
    .min(1, "Name is Required"),
  email: Yup.string()
    .required("Email is Required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  profileImage: Yup.mixed()
    .nullable() // Allow the field to be null
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true; // Skip validation if no file is provided
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    })
    .test('fileSize', 'File size should be less than 3MB', (value) => {
      if (!value) return true; // Skip validation if no file is provided
      return value.size <= 3 * 1024 * 1024; // Limit to 4MB
    }),
});

const updateUserSchema = Yup.object({
  fullName: Yup.string()
    .required("Name is Required")
    .trim("Name cannot be empty")  // Removes leading and trailing spaces
    .min(1, "Name cannot be empty"),  // Ensures no empty string

  email: Yup.string()
    .required("Email is Required")
    .email("Invalid email format"),

  profileImage: Yup.mixed()
    .nullable()  // Allows the field to be null if no image is uploaded
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true;  // Skip validation if no file is provided
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value?.type);  // Check for valid file types
    })
    .test('fileSize', 'File size should be less than 3MB', (value) => {
      if (!value) return true;  // Skip validation if no file is provided
      return value?.size <= 3 * 1024 * 1024;  // Limit file size to 4MB
    }),
});

const passwordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const loginSchema = Yup.object({
  email: Yup.string()
    .required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
})

export { signUpSchema, updateUserSchema, passwordSchema, loginSchema }