// Rutgers Coding BootCamp - Full Stack Developer - Mon/Wed
// Project 1 - HealthySearch Ilene, Dan, Juan & Himanshu  
// maps.js - to interface with Google Maps APIs
// January 12, 2019
    
// Initialize Firebase
// App Key - w7UvEiaWJksvqgcOea4n
// App Code - HqRyRkE_CPdtcF-Qo5lXdA

function displayMap(lng, lat)
{
    // Initialize platform
    var platform = new H.service.Platform({
    'app_id': 'w7UvEiaWJksvqgcOea4n',
    'app_code': 'HqRyRkE_CPdtcF-Qo5lXdA',
    'userHTTPS': true,
    'useCIT': true
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.normal.map,
    {
      zoom: 10,
      center: { lng: -73.935242, lat: 40.730610 }
    });
}

displayMap(1, 1);