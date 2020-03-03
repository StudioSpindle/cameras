# 🚀 INFI Security Cameras Utrecht

In order for the Google Maps API to run place a `.env` file in `./client/`, with the following contents:

```
API_KEY_GOOGLE_MAPS=<Your-Key>
```

To run this project open a terminal with two tabs. 

In the first tab navigate (cd) to the folder `./server`, and run:

```
$ npm run start
```

This will start a server running on localhost port 5000.

Then in the other tab navigate (cd) to the folder `./client`, and run:

```
$ npm run build
```

Then open the index file in your browser.

## TODO

- [ ] Add tests 🙈 🙉 🙊
- [ ] Make production build robust (i.e. JSMin)
- [ ] Sourcemaps for development (separate webpack config)
- [ ] Deploy it to server
- [ ] Add unhappy flow
