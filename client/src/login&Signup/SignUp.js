import React, { useState } from 'react'
import { useFormik } from "formik";
import { Wrapper } from './SignupStyle';
import { GlobalStyle } from './SignupStyle';
import { signupSchema } from './validation';
import axios from 'axios';
import { Link } from 'react-router-dom';
import iziToast from 'izitoast';

export const apiUrl = 'https://localhost:7049/api/SignUp';


export default function SignUp() {
  const initialValues = {
    Name:"",
    email:"",
    password:"",
    confirm_password:"",
  };

const formikVal = useFormik({
  initialValues,
  validationSchema: signupSchema,
  validateOnChange:true,
  validateOnBlur:true,
  onSubmit:(values,action) => {
    console.log("here in submit "+JSON.stringify(values))
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    axios.post(apiUrl + '/AddSignUp',formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(result => {  
      console.log(result.data);
      if(result.data == "successfull inserted")
      {
        iziToast.success({
          timeout: 10000,
          title: 'Hey',
          message: result.data
      });
      }
      else if(result.data == "Email Exists")
      {
        iziToast.warning({
          timeout: 10000,
          title: 'Hey',
          message: result.data
      });
      }
      else {
        iziToast.error({
          timeout: 10000,
          title: 'Hey',
          message: result.data
      });
      }

      },
      (error) => {
          alert(error);
      }); 
    action.resetForm();
  },
});
// console.log(formikVal);


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
                    <label htmlFor="Name" className="input-label">
                     Name
                    </label>
                    <input
                      type="Name"
                      autoComplete="off"
                      name="Name"
                      id="Name"
                      placeholder="Enter Name"
                      value={formikVal.values.Name}
                      onChange={formikVal.handleChange}
                      onBlur={formikVal.handleBlur}
                    />

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
                  <div className="input-block">
                    <label htmlFor="confirm_password" className="input-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      value={formikVal.values.confirm_password}
                      onChange={formikVal.handleChange}
                      onBlur={formikVal.handleBlur}
                    />

                  </div>
                  <div className="modal-buttons">
                    <a href="#" className="">
                      Want to register using Gmail?
                    </a>
                    <button className="input-button" type="submit">
                      Registration
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
                  <Link to="/login">Login</Link> 
                </p>
                    {formikVal.touched.Name && formikVal.errors.Name ?  (
                      <p className="form-error">{formikVal.errors.Name}</p>
                    ): null}

                    {formikVal.errors.email && formikVal.touched.email ? (
                      <p className="form-error">{formikVal.errors.email}</p>
                    ) : null}

                    {formikVal.errors.password && formikVal.touched.password ? (
                      <p className="form-error">{formikVal.errors.password}</p>
                    ) : null}

                    {formikVal.errors.confirm_password && formikVal.touched.confirm_password ? (
                      <p className="form-error">{formikVal.errors.confirm_password}</p>
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

