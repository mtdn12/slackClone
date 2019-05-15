import React from 'react'
import { func, object, bool } from 'prop-types'
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'

const RegisterPage = ({ registerItem, doRegister, isLoadingAction }) => {
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Formik
          initialValues={registerItem}
          onSubmit={values => doRegister(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .required('Please input email')
              .email('Invalid email'),
            userName: Yup.string().required('Please input user Name'),
            password: Yup.string()
              .required('Please input password')
              .min(6, 'Password must have atleast 6 characters'),
            passwordConfirmation: Yup.string()
              .required('Please input Confirmation password')
              .oneOf([Yup.ref('password')], 'Password must match'),
          })}
          enableReinitialize
          render={({
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            handleSubmit,
          }) => (
            <Form size="large" onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.userName && Boolean(errors.userName)}
                  fluid
                  name="userName"
                  icon="user"
                  iconPosition="left"
                  placeholder="username"
                  type="text"
                />
                <Form.Input
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="email"
                  type="email"
                />
                <Form.Input
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="password"
                  type="password"
                />
                <Form.Input
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.passwordConfirmation &&
                    Boolean(errors.passwordConfirmation)
                  }
                  fluid
                  name="passwordConfirmation"
                  icon="repeat"
                  iconPosition="left"
                  placeholder="password confirmation"
                  type="password"
                />
                <Button
                  color="orange"
                  fluid
                  size="large"
                  type="submit"
                  loading={isLoadingAction}
                  disabled={isLoadingAction}>
                  Submit
                </Button>
              </Segment>
            </Form>
          )}
        />

        <Message>
          {' '}
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

RegisterPage.propTypes = {
  registerItem: object.isRequired,
  doRegister: func.isRequired,
  isLoadingAction: bool.isRequired,
}

export default RegisterPage
