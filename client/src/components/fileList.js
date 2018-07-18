import React from 'react'
//, {Component}
import 'isomorphic-fetch'
//import {Dropbox} from 'dropbox'
import File from './file'

// export default class FileList extends Component {

const FileList = ({files}) => {
  console.log(files)
  return (
    <ul className="list-group">
      {files.map((file, i) => {
        return <File key={i} id={file.id} name={file.name} />
      })}
    </ul>
  )
}

export default FileList
