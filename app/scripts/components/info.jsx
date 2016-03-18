var React = require('react');
var update = require("react-addons-update");
var $ = require('jquery');
var _ = require('underscore');
var google = require('react-google-maps');
var ScriptjsLoader = require("react-google-maps/lib/async/ScriptjsLoader");
var GoogleMap = google.GoogleMap;
var Marker = google.Marker;
var GoogleMapLoader = google.GoogleMapLoader;
// var GoogleMap = google.GoogleMap;
// var Marker = google.Marker;
// console.log(google);
var SimpleMap = React.createClass({
  render: function(){
    return (
      <section style={{height: "100%"}}>
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{lat: -25.363882, lng: 131.044922}}
            >
          </GoogleMap>
        }
      />
    </section>
    );
  }
});

var InfoPanel = React.createClass({
  render: function(){
    return (
      <div className="container-fluid info-holder">
        <div id="infotainer-map" className="infotainer-body">
          <SimpleMap />
        </div>
        <div className="info-abs">
          <div className="row">
            <div id="infotainer">
              <div className="infotainer-header">
                <div className="info-header-block">
                  <div className="info-header-constrain constrain-contact">
                    <h4 className="info-header-title">CONTACT</h4>
                    <div className="info-header-body">
                      <div className="divider"></div>
                      <h6 className="body-title">address</h6>
                      <div className="body-body">123 Example St<br />Somewhere, SC USA</div>
                      <div className="divider"></div>
                      <h6 className="body-title">telephone</h6>
                      <div className="body-body">864.555.5555</div>
                      <div className="divider"></div>
                      <h6 className="body-title">email</h6>
                      <div className="body-body">reservations@maj-thai.eat</div>
                    </div>
                  </div>
                </div>
                <div className="info-header-block">
                  <div className="info-header-constrain constrain-hours">
                    <h4 className="info-header-title">HOURS</h4>
                    <div className="divider"></div>
                    <div className="body-body"><span className="hours-day">Monday</span><span className="hours-hours">10am - 10pm</span></div>
                    <div className="divider"></div>
                    <div className="body-body"><span className="hours-day">Tuesday</span><span className="hours-hours">10am - 10pm</span></div>
                    <div className="divider"></div>
                    <div className="body-body"><span className="hours-day">Wednesday</span><span className="hours-hours">10am - 10pm</span></div>
                    <div className="divider"></div>
                    <div className="body-body"><span className="hours-day">Thursday</span><span className="hours-hours">10am - 10pm</span></div>
                    <div className="divider"></div>
                    <div className="body-body"><span className="hours-day">Friday</span><span className="hours-hours">10am - 10pm</span></div>
                    <div className="divider"></div>
                    <div className="body-body"><span className="hours-day">Saturday</span><span className="hours-hours">10am - 10pm</span></div>
                    <div className="divider"></div>
                    <div className="body-body"><span className="hours-day">Sunday</span><span className="hours-hours">10am - 10pm</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
})

module.exports = InfoPanel;
