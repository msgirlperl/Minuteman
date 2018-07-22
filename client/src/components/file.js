import React from 'react'

// export default class File extends Component {
//   render() {
//     return <div>test</div>
//   }
// }

const File = ({id, name, path}) => {
  // express routing will convert / to the end of the param but we want the entire path as the param
  const filePath = path.substr(1).replace('/', '~2F')
  const url = `/api/document/${filePath}`
  return (
    // <li className="list-group-item">
    //   <a target="_blank" href={url}>{name}</a>
    // </li>
    <tr>
      <td>
        <a target="_blank" href={url}>
          {name}
        </a>
      </td>
    </tr>
  )
}

export default File
