const keys = require('../config/keys');
require('isomorphic-fetch'); // or another library of choice.
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: keys.dropboxAccessToken });

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
      .filesListFolder({ path: '/hearing loss' })
      .then(docs => res.json(docs.entries))
      .catch(function(error) {
        res.json({ errorMessage: error });
      });
  });

  app.get('/api/document/:path*', (req, res) => {
    // want the entire path param but the '/' have been custom-encoded with ~2F
    let downloadPath =
      '/' + decodeURIComponent(req.params.path).replace('~2F', '/');

    dbx
      .filesDownload({ path: downloadPath })
      .then(doc => {
        res.header('Content-Type', 'application/pdf');
        res.send(new Buffer(doc.fileBinary, 'binary'));
      })
      .catch(function(error) {
        res.json({ errorMessage: error });
      });
  });
};
