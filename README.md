# 🚀 INFI Security Cameras Utrecht

## Server

To view the results of this project first open the server.

### install and run project

Navigate (cd) to the folder `./server`, and run:

```
$ npm install && npm run start
```

This will start a server running on localhost port 5000.

To check api documentation open a browser and view `http://localhost:5000/api-docs/` for swagger.

Then there are two methods of viewing the results.

## 1. Client

Run another terminal tab and navigate (cd) to the folder `./client`.

### private api key

Place a `.env` file in `./client/`, with the following contents:

```
API_KEY_GOOGLE_MAPS=<Your-Key>
```

You can also request a temporary key via: remi@studiospindle.nl.

### install and run project

Then run:

```
$ npm install && npm run build
```

Then open the index.html file in your browser.

Expected is to be able to see a Google Maps map with the camera's on the correct location.

## 2. CLI

The other method to view the results of the API is to use the CLI.

### install and run project

For this navigate in a terminal window to: `./cli/src/`.

Then run: 

```
$ npm install && node search.js --name Neude
```

Expected output:

```
501 | UTR-CM-501 Neude rijbaan voor Postkantoor | 52.093421 | 5.118278
503 | UTR-CM-503 Neude plein | 52.093448 | 5.118536
504 | UTR-CM-504 Neude / Schoutenstraat | 52.092995 | 5.119088
505 | UTR-CM-505 Neude / Drakenburgstraat / Vinkenurgstraat | 52.092843 | 5.118351
506 | UTR-CM-506 Vinkenburgstraat / Neude | 52.092378 | 5.117902
507 | UTR-CM-507 Vinkenburgstraat richting Neude | 52.092234 | 5.117766
```

## Improvements

- [ ] Add tests 🙈 🙉 🙊
- [ ] Make production build robust (i.e. JSMin)
- [ ] Sourcemaps for development (separate webpack config)
- [ ] Deploy client and server to a hosted webserver
- [ ] Add unhappy flow
