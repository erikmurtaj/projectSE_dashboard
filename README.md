Introduction
============
The goal of this project was to create a communication module to allow the communication between the IoT devices (simulated by a client) and the cloud in order to visualize data in a Web Application.
![project_schema](https://github.com/erikmurtaj/projectSE_dashboard/assets/50946517/89ddea76-6822-4727-8cbe-55eb1115fa3a)

The developed Dashboard is a fully responsive demonstration. Based on **[Bootstrap 4.4](https://getbootstrap.com)** framework and also the JS/jQuery plugin.
The Dashboard connects to the AWS IoT Core cloud service and then fetches real-time data asynchronously coming from the simulated vehicles.

Example of the Dashboard:
![example_dashboard](https://github.com/erikmurtaj/projectSE_dashboard/assets/50946517/f0855e81-dac2-4a37-8a0c-0f7a82bb0264)

Example of fetching the engine temperature of a specific vehicle by his ID:
```
      async function getTemperature(){
        var promise_result=readItem_3(vechile_id);
        var temperature_value;
        await promise_result.then(function(result) {
            temperature_value=result;
        });

        temperature_value;
      }
```

Additionally, MapBox was integrated helping visualizing the real-time position of vehicles in a map.



Usage
------------

#### Host this dashboard:

This dashboard it's actually a website. To assure that everything works you have to host it.
You can to it locally using some tools. One of them is called **[XAMPP](https://www.apachefriends.org/)**


Browser Support
---------------
- IE 10+
- Firefox (latest)
- Chrome (latest)
- Safari (latest)
- Opera (latest)
- Microsoft Edge (latest)

License
-------
This dashboard is an open source project by students of MDH Mälardalens högskola
(course of Software Engineering 2: Team Project).
This dashboard is licensed under [MIT](http://opensource.org/licenses/MIT).
