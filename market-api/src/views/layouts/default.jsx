const React = require('react');
const { Container, Navbar } = require('react-bootstrap');

function DefaultLayout(props) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css"></link>
      </head>
      <body>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Market</Navbar.Brand>
            {props.user && (
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Hello, {props.user.email} <a href="/logout">Logout</a>
                </Navbar.Text>
              </Navbar.Collapse>
            )}
          </Container>
        </Navbar>
        <Container className="p-3">
          <Container
            className="mb-4 bg-light rounded-3"
            style={{ padding: '3rem 15rem' }}
          >
            {props.children}
          </Container>
        </Container>
      </body>
    </html>
  );
}

module.exports = DefaultLayout;
