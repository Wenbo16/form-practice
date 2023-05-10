import styles from "./App.module.css";
import InviteFriends from "./formik/InviteFriends";
import SignupFormCustomised from "./formik/SignupFormCustomised";
import SignupForm from "./formik/SignupFormWithContext";
import Reservation from "./formik/MiniFormik";
import JSONSchemaForm from "./json-schema";
import SignUp from "./json-schema/SignUp/index.tsx";
import MyForm from "./my-form-hooks";

function App() {
  return (
    <div className={styles.App}>
      <MyForm />
    </div>
  );
}

export default App;
