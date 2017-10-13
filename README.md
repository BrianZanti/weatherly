# Usage
CURRENTLY IN DEVLOPMENT MODE ONLY
* `git clone https://github.com/BrianZanti/weatherly`
* `cd weatherly`
* `npm install`
* `npm test`
* `npm start`
You will have to first add a Weather Underground API key for the test and start functionality to work

### Adding Weather Underground API key
* Get your api key from https://www.wunderground.com/weather/api/
* create file /weatherly/src/wunderground-api-key.js
* add to wunderground-api-key.js where [YOUR_API_KEY] is the API key given to you by Weather Underground. Note that the API key is a string:
~~~
const apiKey = '[YOUR API KEY]';
export default apiKey; 
~~~
# Reflections
I removed my Welcome component. In the end, it was just a header element that accepted a message as a prop, so instead I implemented it as a header to keep things simpler. 

I really wanted to add functionality to display the suggested names when the city/state was not found. It feels wrong to have the app just say can't find your location when it has suggestions, but in the end I decided to leave it alone and only do what was asked.

# Wire Frames
![Wireframe_page_1](./Wireframe/Page_1.png?raw=true)
![Wireframe_page_2](./Wireframe/Page_3.png?raw=true)


