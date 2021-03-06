import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import FileList from './components/fileList';
import TagFilter from './components/tagFilter';
import SearchBox from './components/search';
import Api from './Api';

window.Api = Api;

const state = { files: [] };

class App extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      searchfield: ''
    };
  }

  componentDidMount() {
    fetch('/api/document_list')
      .then(response => response.json())
      .then(docs => this.setState({ files: docs }));
    fetch('/api/tags')
      .then(response => response.json())
      .then(tags => this.setState({ tags: tags }));
  }

  onSearchChange = event => this.setState({ searchfield: event.target.value });

  render() {
    const filteredFiles = this.state.files.filter(file =>
      file.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    );

    if (this.state.files.length === 0 || this.state.tags.length === 0) {
      return <h3>Loading...</h3>;
    }
    return (
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{"Minuteman Arc's Document Repository"}</h2>
        </header>
        <div>
          <br />
          <SearchBox searchChange={this.onSearchChange} />
          <br />
          <FileList files={filteredFiles} />
        </div>
      </div>
    );
  }
}
export default App;
