const keys = require('../config/keys');
require('isomorphic-fetch'); // or another library of choice.
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: keys.dropboxAccessToken });
const mongoose = require('mongoose');
const DocumentTypes = mongoose.model('documentTypes');
const Documents = mongoose.model('documents');

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

  app.get('/api/document_list', (req, res, done) => {
    dbx
      .filesListFolder({ path: '/hearing loss' })
      .then(docs => {
        Documents.find({}).then(docsData => {
          console.log('fond?');
          console.log(
            //5b5e089ce7179a0733417e30,
            //todo: why is this not finding this?  It finds if we use; doc._id or doc.tag
            docsData.find(doc => doc.dropboxId == 'cpl9yKTPuQAAAAAAAAAAFA')
          );
          console.log('found');
          docs.entries.forEach(entry => {
            entry['newId'] = entry['id'].substring(3);
            const match = docsData.find(
              doc => doc['dropboxId'] == entry['id'].substring(3)
            );
            if (match) {
              entry['metaData'] = match;
            }
          });
          console.log(docsData);
          res.json(docs.entries);
        });

        // get the mongoDB data
      })
      .catch(function(error) {
        res.json({ errorMessage: error });
        done(null, null);
      });
  });

  app.get('/api/mir', (req, res) => {
    Documents.findOne({ dropBoxId: 'cpl9yKTPuQAAAAAAAAAADA' }).then(d => {
      console.log('HELLO');
      res.json('test');
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
