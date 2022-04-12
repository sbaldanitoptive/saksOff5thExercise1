var React = require('react');
var DefaultLayout = require('./layouts/default');

function Login(props) {
  return (
    <DefaultLayout title={props.title}>
      <div>Login Page</div>
    </DefaultLayout>
  );
}

module.exports = Login;
