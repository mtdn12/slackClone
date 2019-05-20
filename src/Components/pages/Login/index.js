import React, { useContext, useState } from 'react'
import { StoreContext } from '../../../Stores/StoreContext'
import { FirebaseContext } from '../../../Stores/Firebase'
import { showNotification } from '../../../Stores/Notification/Actions'
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
import Layout from '../../layouts/NonAuthLayout'

const renderErrors = (errors, touched) => {
  return Object.keys(errors)
    .filter(touch => touched[touch])
    .map(e => errors[e])
}

const LoginPage = () => {
  // State check loading action
  const [isLoadingAction, setLoadingAction] = useState(false)
  const { state, dispatch } = useContext(StoreContext)
  // firebase
  const firebase = useContext(FirebaseContext)
  // handle login
  const handleLogin = values => {
    setLoadingAction(true)
    firebase
      .doSignInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        dispatch(showNotification('Login', 'Login success', 'blue'))
        setLoadingAction(false)
      })
      .catch(err => {
        dispatch(showNotification('Login', err.message, 'red'))
        setLoadingAction(false)
        console.log('Error log in', err.message)
      })
  }
  return (
    <Layout>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: '100%' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login for DevChat
          </Header>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={values => handleLogin(values)}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required('Please input email')
                .email('Invalid email'),
              password: Yup.string()
                .required('Please input password')
                .min(6, 'Password must have atleast 6 characters'),
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
                  <Button
                    color="violet"
                    fluid
                    size="large"
                    type="submit"
                    loading={isLoadingAction}
                    disabled={isLoadingAction}>
                    Submit
                  </Button>
                </Segment>
                {renderErrors(errors, touched).length > 0 && (
                  <Message negative>
                    <Message.List items={renderErrors(errors, touched)} />
                  </Message>
                )}
              </Form>
            )}
          />
          <Message>
            {' '}
            Not a user? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Layout>
  )
}

LoginPage.propTypes = {}

export default LoginPage
