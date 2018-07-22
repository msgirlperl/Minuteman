import React from 'react'
//, {Component}
// import 'isomorphic-fetch'
//import {Dropbox} from 'dropbox'
import File from './file'

// export default class FileList extends Component {

const FileList = ({files}) => {
  
  return (
    // <ul className="list-group">
    //   {files.map((file, i) => {
    //     return <File key={i} id={file.id} name={file.name} path={file.path_lower} />
    //   })}
    // </ul>
    <table id="documents" className="table table-hover">
      <thead>
      <tr>
        <th>Title</th>

      </tr>
    </thead>
    <tbody>
      {files.map((file, i) => {
        return <File key={i} id={file.id} name={file.name} path={file.path_lower} />
      })}
      </tbody>
    </table>
  )
}

export default FileList
