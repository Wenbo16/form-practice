import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const SignupForm = () => {
  // a validate function that will be called when form values change or fields are blurred,
  // By default, Formik will validate after each keystroke (change event), each input’s blur event, as well as prior to submission.
  const {
    values,
    errors,
    touched,
    getFieldProps,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input id="firstName" type="text" {...getFieldProps("firstName")} />
      {/* {touched.firstName && errors.firstName ? (
        <div>{errors.firstName}</div>
      ) : null} */}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.lastName}
      />
      {/* {touched.lastName && errors.lastName ? (
        <div>{errors.lastName}</div>
      ) : null} */}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />
      {/* formik.errors is populated via the custom validation function.  */}
      {/* {touched.email && errors.email ? <div>{errors.email}</div> : null} */}
      {/* The onSubmit function we passed to useFormik() will be executed only if there are no errors (i.e. if our validate function returns {}). */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
