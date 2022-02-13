import { useState, useEffect } from 'react'
import About from './About';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const Login = (props) => {
  const { user } = props;
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    if (user) {
      window.location.href = "/dashboard"
    }
  }, [user]);

  async function loginUser(event) {
    event.preventDefault()

    console.log(process.env.REACT_APP_SERVER_URL);

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user)
      window.location.href = '/dashboard'
    } else {
      setFormError(true);
    }
  }

  return (
    <>
      <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color='blue'>Chitchat</Header>
          <Header as='h2' color='black' textAlign='center'>
            Log-in to your account
          </Header>
          <Form size='large' onSubmit={loginUser}>
            <Segment stacked>
              <Form.Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fluid icon='user'
                iconPosition='left'
                placeholder='Username'
              />
              <Form.Input
                fluid
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
              {formError && <p style={{ color: 'red' }}>INVALID LOGIN: Please check your username or password</p>}
              <Button color='blue' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='/register'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
      <About />
    </>
  )
}

export default Login;