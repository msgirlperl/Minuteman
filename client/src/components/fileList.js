import React, {Component} from 'react'
import 'isomorphic-fetch'
import {Dropbox} from 'dropbox'

export default class FileList extends Component {
  displayFiles(files) {
    var filesList = document.getElementById('files')
    var li
    for (var i = 0; i < files.length; i++) {
      li = document.createElement('li')
      li.appendChild(document.createTextNode(files[i].name))
      filesList.appendChild(li)
    }
  }

  getFilesList() {
    let dbx = new Dropbox({
      accessToken:
        '_g9iTtW5PyAAAAAAAAAABoAOc-Frxn0WeSBofydk0_-21t8JzrayBIem2BDezJC0'
    })
    // new Dropbox({
    //   accessToken:
    //     '_g9iTtW5PyAAAAAAAAAABoAOc-Frxn0WeSBofydk0_-21t8JzrayBIem2BDezJC0'
    // })
    // .filesListFolder({path: '/Hearing Loss'})
    // .then(console.log, console.error)
    //return dbx.filesListFolder({path: '/Hearing Loss'})

    dbx
      .filesListFolder({path: '/Hearing Loss'})
      .then(response => {
        console.log('response', response)
        this.displayFiles(response.entries)
        console.log(response)
      })
      .catch(function(error) {
        console.error(error)
      })
  }

  render() {
    return <div>test</div>
  }
}
