import React from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";

const initialValues = {
  friends: [
    {
      name: "",
      email: "",
    },
  ],
};
export default function InviteFriends() {
  return (
    <div>
      <h1>Invite Friends</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div className="row">
                <div className="col">
                  <Field name="friends" type="text" />
                </div>
                {/* <Field name="name" type="text">
                  {({ field, form }) => (
                    <input {...field} type="text" placeholder="Jane Doe" />
                  )}
                </Field> */}
                <div className="col">
                  <Field name="friends" type="email" />
                </div>
                <div className="col">
                  <button type="button">X</button>
                </div>
              </div>
            </div>
            <button type="button" disabled={isSubmitting}>
              Add Friend
            </button>

            <button type="submit" disabled={isSubmitting}>
              Invite
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
