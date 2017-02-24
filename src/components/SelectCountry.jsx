var React = require('react');

var SelectCountry = React.createClass({
  getInitialState: function () {
    return {country: 'Scotland'};
  },

  handleChange(event) {
    this.setState({country: event.target.value})
  },
  render: function() {
    return(
    <select id='country' value={this.state.value} onChange={this.handleChange}>
    <option value="Scotland">Scotland</option>
    <option value="England">England</option>
    <option value="Ireland">Ireland</option>
    <option value="Wales">Wales</option>
    </select>
    )
  }
});

module.exports = SelectCountry;
