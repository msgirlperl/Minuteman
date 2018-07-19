import React, {Component} from 'react'
import logo from './logo.png'
import './App.css'
import FileList from './components/fileList'
import Api from './Api'

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
    return (
      <div className="container">
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
export default App
