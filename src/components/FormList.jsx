var React = require('react');
var SelectCountry = require('./SelectCountry')

var FormList = React.createClass({
  getInitialState: function() {
    return {fullAddress: [], country: '', city: '', address: '', latitude: null, longitude: null}
  },
  handleOnChange: function() {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' +this.postcode.value + '&key=AIzaSyBOWOMfnnUXvxChQ1JO7dyYXI1F15pND3c';
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function() {
      if(request.status === 200) {
        var data = JSON.parse(request.responseText);
        this.setState({fullAddress: data.results[0]});
        console.log('ad', this.state.fullAddress);
        this.autoComplete();
      }
    }.bind(this)
    request.send();
  },

  autoComplete: function() {
    var geocode = this.state.fullAddress
    this.setState({country: geocode.address_components[3].long_name, city: geocode.address_components[2].long_name, address: geocode.address_components[1].long_name, latitude: geocode.geometry.location.lat, longitude: geocode.geometry.location.lng})
  },

  render: function() {

    // console.log('ad', this.state.fullAddress[1]);
    return(
      <form onSubmit={this.handleSubmit} className='nameForm'>
      <img src="../../icons/user.png" id='user_image'/>
      <input type='text' name='firstname' placeholder='First name' ref={function(firstname) {return (this.firstname = firstname)}.bind(this)} required/>
      <img src="../../icons/user.png" id='user_image'/>
      <input type='text' name='lastname' placeholder='Last name' ref={function(lastname) {return (this.lastname = lastname)}.bind(this)}/>
      <br/>
      <img src='../../icons/email.png' id='email_image'/>
      <input type='email' name='email' placeholder='E-mail' ref={function(email) {return (this.email = email)}.bind(this)}/>
      <img src='../../icons/phone.png' id='phone_image'/>
      <input type='integer' name='phone' placeholder='Phone' ref={function(phone) {return (this.phone = phone)}.bind(this)}/>
      <hr/>
      <SelectCountry/>
      <input type='text' name='city' placeholder='City' value={this.state.city}/>
      <input type='text' name='postcode' placeholder='Post code' ref={function(postcode) {return (this.postcode = postcode)}.bind(this)}/><br/>
      <p id ='addressLink' onClick={this.handleOnChange}>get address</p>
      <input type='text' name='address' placeholder='Address' value={this.state.address}/><br/>
      <input type='text' name='additional' placeholder='Additional info' ref={function(additional) {return (this.additional = additional)}.bind(this)}/>
      <input type='text' name='lat' placeholder='Latitude' value={this.state.latitude}/>
      <input type='text' name='lng' placeholder='Longitude' value={this.state.longitude}/><br/>
      <input type='submit' value='submit' id='submit'/>
      </form>
      )
  }
});

module.exports = FormList;