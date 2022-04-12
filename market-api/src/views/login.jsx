const React = require('react');
const { Form, Button, Container } = require('react-bootstrap');

const DefaultLayout = require('./layouts/default');

function Login(props) {
  return (
    <DefaultLayout {...props}>
      <h1 className="text-center">Login</h1>
      <Container fluid className="p-3">
        <Form action="/login" method="post" target="_self">
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log In!
          </Button>
        </Form>
      </Container>
    </DefaultLayout>
  );
}

module.exports = Login;
