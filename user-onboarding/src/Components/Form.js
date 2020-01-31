import React, { useState, useEffect } from "react";
import { withFormik, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components"

const FormStyle = styled.div`
width:75%;
margin-left:15%;
font-family: Georgia, serif;
font-size: 19px;

color: white;
font-weight: normal;
text-decoration: none;
font-style: normal;
font-variant: normal;
text-transform: none;
border: 5px outset #1C6EA4;
border-radius: 40px 40px 40px 40px;


`

const UnorderedList=styled.ul`
-webkit-box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0); 
box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0);
width:50%;
margin-left:25%;
margin-top:2%;


`


const UserForm = ({ values, errors, touched, status })=>{
//     console.log("values", values);
//   console.log("errors", errors);
// ==  console.log("touched", touched);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        console.log("status has changed", status);
        status && setUsers(users=>[...users, status]);
    }, [status]);
    return (
        <FormStyle>
            <Form>

                <label htmlFor="name">
                    Name:
                    <Field id="name" type="text" name="name" placeholder="enter name here"/>
                    {touched.name && errors.name && (
                    <p>{errors.name}</p>
                    )}
                </label>

                <label htmlFor="email">
                    Email:
                    <Field id="email" type="text" name="email" placeholder="enter email here"/>
                    {touched.email && errors.email && (
                    <p>{errors.email}</p>
                    )}
                </label>

                <label htmlFor="password">
                    Password: 
                    <Field id="password" type="text" name="password" placeholder="enter password here"/>
                    {touched.password && errors.password && (
                    <p>{errors.password}</p>
                    )}
                </label>
                <label htmlFor="birth">
                    Birth Date: 
                    <Field id="birth" type="text" name="birth" placeholder="enter birth here"/>
                    {touched.birth && errors.birth && (
                    <p>{errors.birth}</p>
                    )}
                </label>

                <Field as="select" className="" name="salary">
                    <option>Role</option>
                    <option value="Back-End">Back-End</option>
                    <option value="Front-End">Front-End</option>
                    <option value="Full-Stacks">Full-Stacks</option>
                    <option value="Not Full-Stacks">Not Full-Stacks</option>
                </Field>

                

                <label className="">
                    Terms of Service
                    <Field type="checkbox" name="terms" checked={values.terms}/>
                    <span className="checkmark"/>
                </label>

               
                <button type="submit">Submit!</button>
                </Form>
                {users.map(user=>{
                    return (

                        <UnorderedList  key={user.id}>
                            <un>Name: {user.name}</un>
                            <li>Email: {user.email}</li>
                            <li>Password: {user.password}</li>
                            <li>Birth Date: {user.birth}</li>
                            <li>Salary:{user.salary}</li>
                        </UnorderedList>
                    );
                })}
        </FormStyle>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues(props){
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            birth: props.birth || "",
            terms: props.terms || false,
            qualities: props.qualities || ""
         };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        email: Yup.string().required("Email is Required"),
        password: Yup.string().required("Password is Required"),
        birth : Yup.string().required("Birth Date is Required")
    }),
    handleSubmit(values, {setStatus, resetForm}){
        console.log('submitting', values);
        axios.post("https://reqres.in/api/users", values)
        .then(response=>{
            console.log("success", response)
            setStatus(response.data);
            resetForm()
        })
        .catch(error=> console.log(error.response));
    }

})(UserForm);

export default FormikUserForm;




