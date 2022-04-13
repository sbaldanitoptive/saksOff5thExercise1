const React = require('react');
const { Container } = require('react-bootstrap');

const DefaultLayout = require('./layouts/default');

function PostOrder(props) {
  return (
    <DefaultLayout {...props}>
      <Container fluid className="justify-content-center text-center">
        <div className="m-5 p-5">
          <h1 className={`${props.success ? `text-success` : `text-danger`}`}>
            {props.success
              ? `New Product(s) Successfully created!`
              : `Product(s) could not be created`}
          </h1>
        </div>
        <div className="pt-5">
          <a className="text-large mt-5" href="/create-products">
            {'<< Go Back to Add More Products'}
          </a>
        </div>
      </Container>
    </DefaultLayout>
  );
}

module.exports = PostOrder;
