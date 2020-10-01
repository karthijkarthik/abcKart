import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import axios from 'axios';
import { Grid, TextField, Button } from '@material-ui/core';
 
import styles from './register.module.css';

 const Register = ({setRegister}) => (
   <div>
      <Formik
        initialValues={{ name: '', mobile: '', email: '', password: '' }}
        validate={values => {
            const errors = {};
            if(!values.name) {
                errors.name = 'Required'
            }

            if(!values.mobile) {
                errors.mobile = 'Required'
            } 

            if (!values.email) {
                errors.email = 'Required';
            } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        onSubmit={async (values) => {
            const data = JSON.parse(JSON.stringify(values));
            data.id = 4;
            await axios.post('http://localhost:3000/users', data
            ).then(res => {
                alert(JSON.stringify(res.data))
            }).catch(error => {
                alert(JSON.stringify(error))
            });   
        }}
      >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting
       }) => (
        <form onSubmit={handleSubmit}>
          <Grid container xs={12} justify="center">
            <Grid item md={true} sm={true} xs={true}>
              <TextField 
                id="name" 
                label="Name" 
                type="text" 
                fullWidth 
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name} />
              <span className={styles.error}>{errors.name && touched.name && errors.name}</span>
            </Grid>
          </Grid>
          <Grid container xs={12} justify="center">
            <Grid item md={true} sm={true} xs={true}>
              <TextField 
                id="mobile" 
                label="Mobile Number" 
                type="text" 
                fullWidth 
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobile} />
              <span className={styles.error}>{errors.mobile && touched.mobile && errors.mobile}</span>
            </Grid>
          </Grid>
          <Grid container xs={12} justify="center">
            <Grid item md={true} sm={true} xs={true}>
              <TextField 
                id="email" 
                label="Email" 
                type="text" 
                fullWidth 
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email} />
              <span className={styles.error}>{errors.email && touched.email && errors.email}</span>
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Grid item md={true} sm={true} xs={true}>
              <TextField 
                id="password" 
                label="Password" 
                type="password" 
                fullWidth 
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password} />
              <span className={styles.error}>{errors.password && touched.password && errors.password}</span>
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '20px' }}>
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              disabled={isSubmitting}
            >REGISTER</Button>
            {errors.invalidUser && errors.invalidUser}
          </Grid>
        </form>
       )}
     </Formik>
    <span className={styles.registerLink} onClick={() => setRegister(false)}>Existing User? Log in</span>
   </div>
 );
 
 Register.propTypes = {
  setRegister: PropTypes.func.isRequired
 }

 export default Register;