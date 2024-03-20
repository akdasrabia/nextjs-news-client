import * as Yup from "yup";

export const createNewsValidation = Yup.object().shape({
  slug: Yup.string()
    .required("This field is required")
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Invalid slug format. Slugs can only contain lowercase letters, numbers, and hyphens."
    ),
  title: Yup.string().required("This field is required"),
});
