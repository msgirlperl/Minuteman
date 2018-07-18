import React from 'react'

// export default class File extends Component {
//   render() {
//     return <div>test</div>
//   }
// }

const File = ({id, name}) => {
  return (
    <li class="list-group-item">
      <a href="">{name}</a>
    </li>
  )
}

export default File
