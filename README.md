<!-- ABOUT THE PROJECT -->
## About The Project

![Screen Shot](https://github.com/rasmusjaa/warehouse-reaktor/blob/main/warehouse-screenshot.png)

Assignment for Reaktor junior dev position. Purpose was to create simple UI to show product availability for 3 categories of products, all own their own pages.

Data is fetched from 2 legacy APIs. First product data for 3 categories from first API, then getting manufacturers from that data and fetch availability data from manufacturer API. All products are checked against manufacturer data and availability from manufacturer data is added to product data. Data is served to front end in JSON format. Front end displays all data in grid.

### Notes
* Both legacy APIs serve data in a bit different format, so after fetching data had to be handled a bit differently
* Legacy API cache is about 5 minutes so calls to that api are also made in 5 minute intervals after first call
* To keep data available to front end all the time back end updates data only after all new data is successfully retrieved
* Second API gives random errors which can also be forced with a request header "x-force-error-mode" set to "all". I handled this by looping API calls and repeating certain call if data retrieved was broken. Repeating done max 10 times per "round" (all API legacy calls) to avoid bombarding legacy API if it's down, after which next try is again after normal 5 minute interval. Old data from back end is served even if legacy API calls fail as long as legacy data has been retrieved at least once
* Currently data seems to have products from 4 different manufacturers and all categories have products from all 4 manufacturers. Back end is still done in a way that can handle more or less manufacturers and different manufacturers per product category
* After data from legacy APIs is retrieved they are combined by checking id and manufacturer of each product and retrieving availability from that manufacturer data using same id. Availability part of that data is in string between tags and is found using regex
* Back end handles serving it's own API data from 3 different routes and other calls are routed to front end
* Front end is minimal and without front page to make access to data as easy as possible. Data is on 3 pages, other calls lead to custom 404 page
* All data from category is always available on certain page, but only part that user is looking at is loaded to keep loading speed fast
* Available data amount shown on screen is handled by using responsivity with screen height. Data is shown on 7, 2 or 1 column based on screen width
* Header line is always on top of data to make it easy to check which column is which
* Stock data is also shown with color codes in addition to text format to make checking it fast
* Color data is an array that has been separated to make it clear when product has multiple color options
* Filtering, search and pagination is not implemented since it was instructed that they are not needed

## Built With
* [React](https://reactjs.org/)
  * [react-router](https://reactrouter.com/) (route user with menu)
  * [react-window](https://github.com/bvaughn/react-window) (optimize loading speed with thousands of lines of data)
* [Node.js](https://nodejs.org/en/)
  * [fetch](https://www.npmjs.com/package/node-fetch) (used with await to get data from legacy API and handle errors with legacy API)
  * [axios](https://github.com/axios/axios) (used with .then to get data from back end)
* [Express](https://expressjs.com/)
  * [cors](https://expressjs.com/en/resources/middleware/cors.html)


## Running project

Live version can be found on [Heroku](https://rj-warehouse.herokuapp.com/)

To run this project locally:
1. Clone the repo
2. cd repodir/client
3. npm install
4. cd ../api
5. npm install
6. npm run build:ui
7. npm start
8. open http://localhost:3001/

After npm start it takes about 20 seconds until data from legacy APIs is fetched and combined, so you might need to refresh browser if you open url before it's ready.

You can also run client separately in client dir with npm start and open on http://localhost:3000/ but you need to run back end from api as well if you want to get data.

To show raw json from back end api:
http://localhost:3001/api/jackets
http://localhost:3001/api/shirts
http://localhost:3001/api/manufacturers
