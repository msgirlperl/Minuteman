const keys = require('../config/keys');
require('isomorphic-fetch'); // or another library of choice.
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: keys.dropboxAccessToken });
const mongoose = require('mongoose');
const DocumentTypes = mongoose.model('documentTypes');
const Documents = mongoose.model('documents');
const _ = require('lodash');

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
      .then(docs => {
        Documents.find({}).then(docsData => {
          docs.entries.forEach(entry => {
            entry['newId'] = entry['id'].substring(3);
            const match = docsData.find(
              doc => doc['dropboxId'] == entry['id'].substring(3)
            );
            if (match) {
              entry['tags'] = match.get('tags');
            }
          });
          res.json(docs.entries);
        });
      })
      .catch(function(error) {
        res.json({ errorMessage: error });
      });
  });

  app.get('/api/tags', (req, res) => {
    Documents.find({}, { tags: 1, _id: 0 }).then(doctags => {
      const list = [];
      doctags.forEach(tagList => {
        list.push(tagList.get('tags'));
      });
      res.json(_.uniq(_.flatten(list)));
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
