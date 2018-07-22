const express = require('express');
//const mongoose = require('mongoose')
const keys = require('./config/keys');
const cors = require('cors');
const path = require('path');
//require('./models/document')

require('isomorphic-fetch'); // or another library of choice.
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: keys.dropboxAccessToken });

//mongoose.connect(keys.mongoURI)

const app = express();
app.use(cors());

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     keys: [keys.cookieKey]
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

require('./routes/documents')(app);

app.use('/api', (req, res, next) => {
  res.header('Cache-Control', 'no-cache');
  next();
});

// // Serve static assets in the /public directory
// app.use(
//   serve(path.join(__dirname, '../public'), {
//     cacheControl: 'no-cache'
//   })
// )

app.use((err, req, res, next) => {
  // Handle missing file in public dir as a 404
  if (err.code === 'ENOENT') {
    return res.status(404).send('404 - Page not found');
  }
  console.log(err);
  res.status(500).send(err);
});

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  // const path = require('path');
  // app.get('/*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
}

const PORT = process.env.PORT || 5000; // 5000 in dev environment
app.listen(PORT);
