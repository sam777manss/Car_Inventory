import React, { useState } from 'react'
import { useFormik } from "formik";
import { Wrapper } from './SignupStyle';
import { GlobalStyle } from './SignupStyle';
import { loginSchema } from './validation';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import iziToast from 'izitoast';


export const apiUrl = 'https://localhost:7049/api/SignUp';


export default function Login() {
  const navigate = useNavigate();
  const initialValues = {
    email:"",
    password:"",
  };

const formikVal = useFormik({
  initialValues,
  validationSchema: loginSchema,
  validateOnChange:true,
  validateOnBlur:true,
  onSubmit:(values,action) => {
    console.log("here in submit "+JSON.stringify(values))
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    axios.post(apiUrl + '/GetlogedUser',formData).then(response => response.data).then(  
            (result)=>{  
              console.log(result) 

              if(result)
              {
                localStorage.setItem('Userid', result.id);
                navigate("/admin");
              }
              else 
              {
                iziToast.warning({
                  timeout: 10000,
                  title: 'Hey',
                  message: "SignIn First"
              });
              }
            },  
            (error)=>{  
                console.log({error});  
            }  
        )


    action.resetForm();
  },
});
console.log(formikVal);


  return (
    <>
    <GlobalStyle/>
    <Wrapper>
    <div>
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
                <h1 className="modal-title">Welcome!</h1>
                <p className="modal-desc">
                </p>
                <form onSubmit={formikVal.handleSubmit}>
                  <div className="input-block">
                  </div>
                  <div className="input-block">
                    <label htmlFor="email" className="input-label">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={formikVal.values.email}

                      onChange={formikVal.handleChange}
                      onBlur={formikVal.handleBlur}
                    />
                  </div>
                  <br/>
                  <div className="input-block">
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={formikVal.values.password}
                      onChange={formikVal.handleChange}
                      onBlur={formikVal.handleBlur}
                      />
                  </div>
                  <div className="modal-buttons">

                    <button className="input-button" type="submit">
                      login
                    </button>
                  </div>
                </form>


              </div>
              <div className="modal-right">
                <img
                  src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
                  alt=""
                />
                <p className="login-link">
                  <Link to='/signUp'>SignUp</Link>
                </p>
                    {formikVal.errors.email && formikVal.touched.email ? (
                      <p className="form-error">{formikVal.errors.email}</p>
                    ) : null}

                    {formikVal.errors.password && formikVal.touched.password ? (
                      <p className="form-error">{formikVal.errors.password}</p>
                    ) : null}
              </div>
            </div>
          </div>
        </div>
    </div>
    </Wrapper>
    </>
  )
}

