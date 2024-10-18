import './Registration.css'
import Header from "../../Components/Header/Header.jsx";
import RegistrationForm from "./RegistrationForm/RegistrationForm.jsx";

function Registration() {

  return (
    <>
      <Header page={'Авторизация'} src={'/authorization'}/>
      <RegistrationForm/>
    </>
  )
}

export default Registration
