import React, { Component } from 'react';

class TagFilter extends Component {
  constructor() {
    super();
    this.state = { selected: false };
  }
  setActive = () => {
    //    $('#filters .current').removeClass('current');
    //    $(this).addClass('current');
    // const selector = $(this).attr('data-filter');
    //
    // $('.items').isotope({
    //   filter: selector,
    //   animationOptions: {
    //     duration: 1500,
    //     easing: 'linear',
    //     queue: false
    //   }
    // });
    // return false;
    //  this.props.onClick =
  };

  render() {
    return (
      <li>
        <a
          href="#"
          onClick={this.props.onClick}
          data-filter={this.props.tag.replace(/ /g, '_')}
        >
          {this.props.tag.replace('_', ' ')}
        </a>
      </li>
    );
  }
}
export default TagFilter;
