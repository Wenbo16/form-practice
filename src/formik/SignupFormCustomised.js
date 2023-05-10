import React from "react";
import { Radio } from "antd";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently than other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { options, onRadioChange } = props;
  const { onChange, ...restField } = field;
  const { setFieldValue } = useFormikContext();
  const onChangeHandler = (e) => {
    setFieldValue("gender", e.target.value);
    onRadioChange();
  };

  return (
    <>
      <Radio.Group onChange={onChangeHandler} {...restField}>
        <label htmlFor={props.id}>{label}</label>
        {options.map((opt, index) => (
          <Radio value={opt} key={index}>
            {opt}
          </Radio>
        ))}
      </Radio.Group>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
// And now we can use these
const SignupFormCustomised = () => {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          acceptedTerms: false, // added for our checkbox
          jobType: "", // added for our select,
          gender: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          gender: Yup.string()
            .required("Required")
            .oneOf(["male", "female"], "Invalid Gender Type"),
          jobType: Yup.string()
            .oneOf(
              ["designer", "development", "product", "other"],
              "Invalid Job Type"
            )
            .required("must have"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(values) => (
          <Form>
            <div>
              <MyTextInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Jane"
              />
            </div>
            <div>
              <MyTextInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Doe"
              />
            </div>
            <div>
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@formik.com"
              />
            </div>
            <MySelect label="Job Type" name="jobType">
              <option value="">Select a job type</option>
              <option value="designer">Designer</option>
              <option value="development">Developer</option>
              <option value="product">Product Manager</option>
              <option value="other">Other</option>
            </MySelect>
            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>
            {/* <div role="group" aria-labelledby="my-radio-group">
              <label style={{ marginRight: "20px" }}>
                <Field type="radio" name="picked" value={1} as={Radio} />
                One
              </label>
              <label>
                <Field type="radio" name="picked" value={2} as={Radio} />
                Two
              </label>
              <div>Picked: {values.picked}</div>
            </div> */}
            <MyRadio
              label="Gender"
              name="gender"
              options={["male", "female"]}
              onRadioChange={() => console.log("Onchange handler")}
            ></MyRadio>
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupFormCustomised;
