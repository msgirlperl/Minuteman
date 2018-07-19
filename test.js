const keys = require('./config/keys')
require('isomorphic-fetch') // or another library of choice.
const Dropbox = require('dropbox').Dropbox
const dbx = new Dropbox({accessToken: keys.dropboxAccessToken})

const path = '/hearing%20loss/instead%20of%20whats%20that.pdf';
const downloadPath = decodeURI(path);

dbx.filesDownload({path: downloadPath})
.then(doc => console.log(doc))
  //res.send(doc))
.catch(function(error) {
  console.log('got here');
  console.log(error)
})
