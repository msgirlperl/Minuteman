import React, {Component} from 'react'
// import logo from './logo.svg'
import logo from './logo.png'
import './App.css'
import FileList from './components/fileList'
import Api from './Api'
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

window.Api = Api

const state = {files: []}

class App extends Component {
  constructor() {
    super()
    this.state = {
      files: []
    }
  }

  componentDidMount() {
    // Api.get('document_list')
    //   .then(res => {
    //     this.setState({files: JSON.parse(res)})
    //   })
    //   .catch(err => console.error(err))
    fetch('http://localhost:5000/api/document_list')
      .then(response => response.json())
      .then(docs => this.setState({files: docs}))
    //   .then(data => console.log(data))
  }

  render() {
    const filesToDisplay = this.state.files
    if (filesToDisplay.length === 0) {
      return <h1>Loading</h1>
    }
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h1 className="App-title">
    //         {"Welcome to Minuteman's Document Repository"}
    //       </h1>
    //     </header>
    //     <div>
    //       <FileList files={filesToDisplay} />
    //     </div>
    //   </div>
    // )
    return (
      <div class="container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{"Minuteman Arc's Document Repository"}</h2>
        </header>
        <div>
          <FileList files={filesToDisplay} />
        </div>
      </div>
    )
  }
}
// <p className="App-intro">
//   To get started, edit <code>src/App.js</code> and save to reload.
// </p>
export default App
