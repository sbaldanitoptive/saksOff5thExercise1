const React = require('react');
const { ListGroup } = require('react-bootstrap');

const DefaultLayout = require('./layouts/default');
const { ROLE } = require('../helpers/types');

function MainPage(props) {
  return (
    <DefaultLayout {...props}>
      <h2 className="text-center mb-3">Available Views</h2>
      <ListGroup>
        {props.user.role === ROLE.MERCHANDISER ? null : (
          <ListGroup.Item
            action
            href="/products-list"
            className="justify-content-space-between"
          >
            <span>Products List</span>
          </ListGroup.Item>
        )}
      </ListGroup>
    </DefaultLayout>
  );
}

module.exports = MainPage;
