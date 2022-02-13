import { useState } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(event) {
    event.preventDefault()

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/register`, {
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
      alert('Please check your username and password')
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color='blue'>Chitchat</Header>
        <Header as='h2' color='black' textAlign='center'>
          Register
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
            <Button color='blue' fluid size='large'>
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <a href='/login'>Login</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Login;