import React from 'react';

const SearchBox = ({searchfield, searchChange}) => {

  return (
    <div className='pa2'>
      <input
        className="form-control"
        type='search'
        placeholder='Search...'
        onChange={searchChange}
        />
    </div>
  );

}

export default SearchBox;
