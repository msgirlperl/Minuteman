const keys = require('../config/keys')
require('isomorphic-fetch') // or another library of choice.
const Dropbox = require('dropbox').Dropbox
const dbx = new Dropbox({accessToken: keys.dropboxAccessToken})

module.exports = app => {
  // app.get(
  //   '/auth/google',
  //   passport.authenticate('google', {
  //     scope: ['profile', 'email']
  //   })
  // );
  //
  // app.get('/auth/google/callback', passport.authenticate('google'));
  //
  // app.get('/api/logout', (req, res) => {
  //   req.logout();
  //   res.send(req.user);
  // });

  app.get('/api/document_list', (req, res) => {
    dbx
      .filesListFolder({path: '/hearing loss'})
      //  .then(response => response.json())
      .then(docs => res.json(docs.entries))
      .catch(function(error) {
        res.json({errorMessage: error})
      })
  })

  app.get('/api/document', (req, res) => {
    dbx
      .filesListFolder({path: '/hearing loss'})
      //  .then(response => response.json())
      .then(docs => res.json(docs.entries))
      .catch(function(error) {
        res.json({errorMessage: error})
      })
  })
}

// import 'isomorphic-fetch'
// import {Dropbox} from 'dropbox'
// //'dropbox').Dropbox;
// new Dropbox({
//   accessToken:
//     '_g9iTtW5PyAAAAAAAAAABoAOc-Frxn0WeSBofydk0_-21t8JzrayBIem2BDezJC0'
// })
//   .filesListFolder({path: '/Hearing Loss'})
//   .then(console.log, console.error)
//
// console.log(Dropbox)
