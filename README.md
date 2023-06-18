# events-app
Fullstack events app. Users can create, update, delete their own events.
Made with express, mongoose, react, redux, leaflet, leaflet-geosearch.
Finished all functionalities, css left. 

## Usage

create a .env in root (events-app/.env) and add these lines,
change YOUR_URI with your mongo uri and JWT_SECRET with 
any string (YOUR_SECRET is valid).

```
NODE_ENV = development
PORT = 5000
MONGO_URI = YOUR_URI
JWT_SECRET = YOUR_SECRET
```
This is a mongo uri example, you can find yours by clicking 
'connect' in your mongo cluster, 'drivers', and there you 
can copy the connection string. Be aware that 'dbname' might
be missing in your connection string, add it manually
```
mongodb+srv://<username>:<password>@<clustername>.asdfqwe.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Install dependencies

```
npm install
cd frontend
npm install
```

### Run

```
npm run server
npm run client
npm run dev
```
