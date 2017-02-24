var React = require('react');
var SelectCountry = require('./SelectCountry')

var FormList = React.createClass({
  getInitialState: function() {
    return {fullAddress: [], country: '', city: '', address: '', additional: '', latitude: null, longitude: null}
  },
  handleOnChange: function() {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' +this.postcode.value;
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function() {
      if(request.status === 200) {
        var data = JSON.parse(request.responseText);
        this.setState({fullAddress: data.results[0]});
        console.log('ad', this.state.fullAddress.address_components[3].types[0]);
        this.autoComplete();
        this.setState({latitude: data.results[0].geometry.location.lat});
        this.setState({longitude: data.results[0].geometry.location.lng});
      }
    }.bind(this)
    request.send();
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var postcode = this.postcode.value;
    alert('Thank you for submitting your form ' + this.firstname.value + " " + this.lastname.value + "!")
  },

  autoComplete: function() {
    this.state.fullAddress.address_components.forEach(function(adLine) {
      if(adLine.types[0] === 'administrative_area_level_1') {
        this.setState({country: adLine.long_name})
      } else if
      (adLine.types[0] === 'administrative_area_level_2') {
        this.setState({city: adLine.long_name})
      } else if
      (adLine.types[0] === 'route') {
        this.setState({address: adLine.long_name})
      } else if
      (adLine.types[0] === 'postal_town') {
        this.setState({additional: adLine.long_name})
      } else
      null;
    }.bind(this))
  },


  render: function() {

    return(
      <form onSubmit={this.handleSubmit} className='form'>
      <div className='col-xs-6'>
        <div className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
          <label htmlFor="firstname" className='sr-only'>First Name:</label>
          <input type='text' name='firstname' placeholder='First name' ref={function(firstname) {return (this.firstname = firstname)}.bind(this)} className="form-control" required/>
        </div>
        </div>
      <div className='col-xs-6'>
        <div className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
          <label htmlFor="lastname" className='sr-only'>Last Name:</label>
          <input type='text' name='lastname' placeholder='Last name' ref={function(lastname) {return (this.lastname = lastname)}.bind(this)} className="form-control" required/>
        </div>
      </div>
        <br/>
      <div className='col-xs-6'>
        <div className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
          <label htmlFor="email" className='sr-only'>Email address:</label>
          <input type='email' name='email' placeholder='E-mail' ref={function(email) {return (this.email = email)}.bind(this)} className="form-control" required/>
        </div>
        <hr/>
      </div>
      <div className='col-xs-6'>
        <div className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span>
          <label htmlFor="phone" className='sr-only'>Phone number:</label>
          <input type='integer' name='phone' placeholder='Phone' ref={function(phone) {return (this.phone = phone)}.bind(this)} className="form-control" required/>
        </div>
        <hr/>
      </div>
       <hr/>
      <div className='col-xs-3'>
        <div className="form-group">
          <label htmlFor="selectcountry" className='sr-only'>Select Country:</label>
          <SelectCountry className="form-control"/>
        </div>
      </div>
      <div className='col-xs-5'>
        <div className="form-group">
          <label htmlFor="city" className='sr-only'>City:</label>
          <input type='text' name='city' placeholder='City' value={this.state.city} className="form-control" required/>
        </div>
      </div>
      <div className='col-xs-4'>
        <div className="form-group">
          <label htmlFor="postcode" className='sr-only'>Post code:</label>
          <input type='text' name='postcode' placeholder='Post code' ref={function(postcode) {return (this.postcode = postcode)}.bind(this)} className="form-control" required/>
          <p id ='addressLink' onClick={this.handleOnChange}>get address</p>
        </div>
      </div>
      <div className='col-xs-12'>
        <div className="form-group">
          <label htmlFor="address" className='sr-only'>Address Line:</label>
          <input type='text' name='address' placeholder='Address' value={this.state.address} className="form-control" required/>
        </div>
      </div>
      <div className='col-xs-12'>
        <div className="form-group">
          <label htmlFor="additional" className='sr-only'>Additional information:</label>
          <textarea className="form-control" rows="5" type='text' name='additional' placeholder='Additional info' value={this.state.additional} className="form-control"/>
        </div>
      </div>
      <div className='col-xs-6'>
        <div className="form-group">
          <label htmlFor="latitude" className='sr-only'>Latitude:</label>
          <input type='text' name='lat' placeholder='Latitude' value={this.state.latitude} className="form-control"/>
        </div>
      </div>
      <div className='col-xs-6'>
        <div className="form-group">
          <label htmlFor="longitude" className='sr-only'>Longitude:</label>
          <input type='text' name='lng' placeholder='Longitude' value={this.state.longitude} className="form-control"/><br/>
        </div>
      </div>
          <input type='submit' value='submit' id='submit'/>
      </form>
      )
  }
});

module.exports = FormList;