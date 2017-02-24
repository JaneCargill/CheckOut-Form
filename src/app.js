var React = require('react');
var ReactDOM = require('react-dom');
var FormContainer = require('./containers/FormContainer');

window.onload = function(){
  ReactDOM.render(
    <FormContainer />,
    document.getElementById('app')
  );
}
