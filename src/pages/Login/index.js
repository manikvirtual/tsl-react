import React,{ useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Config/config';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoginStatus, setIsLoginStatus] = useState(1);
    const [isLoginMessage, setIsLoginMessage] = useState({});
    const [applyCheck] = useState(false);
    const navigate = useNavigate();

    const _handleChange = (event) => {
        let data = fields;
        data[event.target.name] = event.target.value;
        setFields({ ...data });
    };
    
    const _validateForm = () => {
        let formFields = fields;
        let response = _validateLogin(formFields, applyCheck);
        setErrors(response.errors);
        return response.formIsValid;
    };

    const _handleSubmit = (event) => {
        event.preventDefault();
        if (_validateForm()) {
          const headers = {
            'Access-Control-Allow-Origin' : '*',
          }
          const postData = {
            user_name :fields.user_name,
            password :fields.password,
          }
          
          axios.post(API_URL+'authentication/login.php',postData,{headers})
          .then(function(response){
            if(response.data.status ===1){
              setIsLoginStatus(1);
              setIsLoginMessage(response.data.message);
              navigate('/dashboard');
            }else{
              setIsLoginStatus(0);
              setIsLoginMessage(response.data.message);
            }
          }
          )
          .catch(function (error){
            console.log(error);
          })
        }
    };

  const _validateLogin = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;


    if (!fields["user_name"] || fields["user_name"].trim() === '') {
        formIsValid = false;
        errors["user_name"] = "*Please enter your username.";
    }

    if (typeof fields["user_name"] !== "undefined") {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["user_name"])) {
            formIsValid = false;
            errors["user_name"] = "*Please enter valid username.";
        }
    }

    if (!fields["password"] || fields["password"].trim() === '') {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
    }
    else if (fields["password"].length < 4) {
        formIsValid = false;
        errors["password"] = "*please enter minimum 5 character";
    }

      
    return {
        errors : errors,
        formIsValid : formIsValid
    };
  }

  return (
    <div className="app">
      <div className="login-form">
        {isLoginStatus==0 ? <div className="errorMsg text-danger">Invalid Credentials</div> : <div className="successMsg text-success"></div>}
        
        <div className="title">Sign In</div>
        <div className="form">
          <form onSubmit={(event) => _handleSubmit(event)}>
            <div className="input-container">
              <label>Username </label>
              <input type="email" name="user_name" onChange={(event) => _handleChange(event)} />
              <div className="errorMsg text-danger">{errors.user_name}</div>
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="password" onChange={(event) => _handleChange(event)} />
              <div className="errorMsg text-danger">{errors.password}</div>
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}