require('isomorphic-fetch') // or another library of choice.
const Dropbox = require('dropbox').Dropbox
const dbx = new Dropbox({accessToken: 'YOUR_ACCESS_TOKEN_HERE'})

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
    res.send(
      dbx
        .filesListFolder({path: ''})
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    )
  })
}
