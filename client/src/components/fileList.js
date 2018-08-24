import React, {Component} from 'react';
import File from './file';

import TableFilter from 'react-table-filter';
import 'react-table-filter/lib/styles.css';

export default class FileList extends Component {

  constructor(props){
    super(props);
    this.state = {
			"files": props.files
		}
		this._filterUpdated = this._filterUpdated.bind(this);
  }

  _filterUpdated(newData){
		this.setState({
			"files": newData
		});
	}

  render() {

    const files = this.state.files;
		// const elementsHtml = files.map((file, index) => {
		// 	return (
    //         <File>
    //           key={index}
    //           id={file.id}
    //           name={file.name}
    //           path={file.path_lower}
    //         </File>
		// 	);
    // });
    
    return (
      <table id="documentsTable" className="table table-hover">
        <thead>
          <TableFilter 
            rows={files}
            onFilterUpdate={this._filterUpdated} alignleft="true">
            <th filterkey="name" key="name">
              Title
            </th>
            <th filterkey="tags" alignleft="false" key="tag">
              Categories
            </th>
          </TableFilter>
        </thead>
        <tbody id="documents">
          {this.state.files.map((file, i) => {
            return (
              <File
                key={i}
                id={file.id}
                name={file.name}
                path={file.path_lower}
                tags={file.tags || []}
              />
            );
          })}
        </tbody>
      </table>
    );
  };
}

// inside tbody:
// {files.map((file, i) => {
//   return (
//     <File
//       key={i}
//       id={file.id}
//       name={file.name}
//       path={file.path_lower}
//       tags={file.tags || []}
//     />
//   );
// })}

// const FileList = ({ files }) => {
//   return (
//     // <ul className="list-group">
//     //   {files.map((file, i) => {
//     //     return <File key={i} id={file.id} name={file.name} path={file.path_lower} />
//     //   })}
//     // </ul>
//     <div id="documents" className="table table-hover">
//       <ul className="items">
//         {files.map((file, i) => {
//           return (
//             <File
//               key={i}
//               id={file.id}
//               name={file.name}
//               path={file.path_lower}
//               tags={file.tags || []}
//             />
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

//export default FileList;
