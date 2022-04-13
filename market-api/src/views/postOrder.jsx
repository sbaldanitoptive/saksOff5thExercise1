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
              ? `Your Order was Successfully created!`
              : `Your Order could not be processed`}
          </h1>
        </div>
        <div className="pt-5">
          <a className="text-large mt-5" href="/products-list">
            {'<< Go Back to Products List'}
          </a>
        </div>
      </Container>
    </DefaultLayout>
  );
}

module.exports = PostOrder;
