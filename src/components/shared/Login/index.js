import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { Grid, TextField, Button } from '@material-ui/core';
 
import styles from './login.module.css';

 const Login = ({
   onClose, 
   logStatus,
   setUserDetails
  }) => (
   <div>
      <Formik
        initialValues={{ email: '', password: '', invalidUser: '' }}
        validate={values => {
          const errors = {};
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
          const errors = {};
          const data = JSON.parse(JSON.stringify(values));
          const result = await axios(
            `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
          );
          if(result.data.length > 0) {
            logStatus(true);
            console.log(result.data)
            setUserDetails(result.data);
            onClose();
          } else {
            errors.invalidUser = 'Please register using email id to login';
          }
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
            >Login</Button>
            {errors.invalidUser && errors.invalidUser}
          </Grid>
        </form>
       )}
     </Formik>
    <span className={styles.registerLink}>New to abcCart? Create an account</span>
   </div>
 );
 
 export default Login;