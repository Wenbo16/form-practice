import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const SignupFormWithContext = () => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ touched, errors, handleSubmit, getFieldProps }) => (
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" type="text" {...getFieldProps("firstName")} />
          {touched.firstName && errors.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}

          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" type="text" {...getFieldProps("lastName")} />
          {touched.lastName && errors.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}

          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" {...getFieldProps("email")} />
          {touched.email && errors.email ? <div>{errors.email}</div> : null}

          <Field name="message" as="textarea" className="form-textarea" />

          <Field name="colors" as="select" className="my-select">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </Field>
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};

export default SignupFormWithContext;
