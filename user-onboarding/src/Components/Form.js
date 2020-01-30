import React, { useState, useEffect } from "react";
import { withFormik, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";


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
        <div>
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

                <Field as="select" className="" name="salary">
                    <option>Choose your expected salary</option>
                    <option value="$80,000">$80,000</option>
                    <option value="$100,000">$100,000</option>
                    <option value="$500,000">$500,000</option>
                    <option value="$1,000,000">$1,000,000</option>
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

                        <ul key={user.id}>
                            <li>Name: {user.name}</li>
                            <li>Email: {user.email}</li>
                            <li>Password: {user.password}</li>
                            <li>Salary:{user.salary}</li>
                        </ul>
                    );
                })}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues(props){
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            terms: props.terms || false,
            qualities: props.qualities || ""
         };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        email: Yup.string().required("Email is Required"),
        password: Yup.string().required("Password is Required")
    }),
    handleSubmit(values, {setStatus, resetForm}){
        console.log('submitting', values);
        axios.post("https://reqres.in/api/users/", values)
        .then(response=>{
            console.log("success", response)
            setStatus(response.data);
            resetForm()
        })
        .catch(error=> console.log(error.response));
    }

})(UserForm);

export default FormikUserForm;
