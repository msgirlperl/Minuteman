import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import FileList from './components/fileList'
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            {"Welcome to Minuteman's Document Repository"}
          </h1>
          <FileList />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
