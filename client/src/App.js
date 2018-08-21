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

    window.$('#documents').isotope({
      filter: 'Cochlear_Implants',
      animationOptions: {
        duration: 1500,
        easing: 'linear',
        queue: false
      }
    });

    // const elem = document.querySelector('.items');
    // new Isotope(elem, {
    //   filter: 'Cochlear_Implants',
    //   animationOptions: {
    //     duration: 1500,
    //     easing: 'linear',
    //     queue: false
    //   }
    // });
  }

  onSearchChange = event => this.setState({ searchfield: event.target.value });

  onFilterChange = event => {
    const selectedElt = event.target;
    window.$('#filters .current').removeClass('current');
    selectedElt.setAttribute('class', 'current');

    window.$('#documents').isotope({
      filter: selectedElt.getAttribute('data-filter'),
      animationOptions: {
        duration: 1500,
        easing: 'linear',
        queue: false
      }
    });
  };

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
          <div className="filter">
            <ul id="filters">
              <li>
                <a
                  href="#"
                  data-filter="*"
                  className="current"
                  onClick={this.onFilterChange}
                >
                  ALL
                </a>
              </li>
              {this.state.tags.map((tag, i) => {
                return (
                  <TagFilter key={i} tag={tag} onClick={this.onFilterChange} />
                );
              })}
            </ul>
          </div>
          <br />
          <FileList files={filteredFiles} />
        </div>
      </div>
    );
  }
}
export default App;
