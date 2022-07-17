import React from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./InviteFriendsStyles.css";

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
        validationSchema={Yup.object({
          friends: Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email!").required("Required"),
          }),
        })}
        onSubmit={(values) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ values, error, touched, isSubmitting }) => (
          <Form>
            <FieldArray name="friends">
              {({ push, remove }) => (
                <>
                  {values.friends &&
                    values.friends.length > 0 &&
                    values.friends.map((friend, index) => (
                      <div>
                        <div className="row">
                          <div className="col">
                            <Field name={`friends[${index}].name`} type="text">
                              {({ field, form }) => (
                                <input
                                  {...field}
                                  type="text"
                                  placeholder="Jane Doe"
                                />
                              )}
                            </Field>
                          </div>
                          <div className="col">
                            <Field
                              name={`friends[${index}].email`}
                              type="email"
                              placeholder="jane@example.com"
                            />
                          </div>
                          <div className="col">
                            <button type="button" onClick={() => remove(index)}>
                              X
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => push({ name: "", email: "" })}
                  >
                    Add New Input
                  </button>
                  <button type="submit" disabled={isSubmitting}>
                    Invite
                  </button>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
}
