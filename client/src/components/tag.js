import React from 'react';

// export default class File extends Component {
//   render() {
//     return <div>test</div>
//   }
// }

const Tag = ({ docId, name, tag }) => {
  return <div className="tag">{tag}</div>;
};

export default Tag;
