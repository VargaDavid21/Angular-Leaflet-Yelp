# Angular Leaflet Yelp

The project is an _example_ front-end application written in **Angular, Typescript, HTML5 and CSS3**, that displays a map and allows the user to interact with it via markers.
The application communicates with the backend of **Yelp Fustion API**, in order to retrieve data concerning the businesses in the application.

When the user clicks the map, businisses nearby that spot are shown inside the left panel. Details on any of the businisses in the left panel can be seen in a right panel by clicking a lsit item or by clicking its corresponding marker on the map.

## How to build & run

> git clone https://github.com/VargaDavid21/angular-leaflet-yelp.git

Inside the cloned directory:

> npm install

Yelp API uses CORS Policy for access to their endpoints. 

In order to bypass this, we will use the CORS-anywhere proxy. 

This can be enabled temporarily from https://cors-anywhere.herokuapp.com/corsdemo.

> npm start

Application should now run on [localhost:4200](http://localhost:4200)!
