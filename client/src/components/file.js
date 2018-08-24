import React from 'react';
import Tag from './tag';

const File = ({ id, name, path, tags }) => {
 
  // express routing will convert / to the end of the param but we want the entire path as the param
  const filePath = path.substr(1).replace('/', '~2F');
  const url = `/api/document/${filePath}`;
  return (
    <tr className={tags.map(tag => tag.replace(' ', '_')).join(' ')}>
      <td>
        <a target="_blank" href={url}>
          {name}
        </a>
     </td>
    <td>
      {tags.map((tag, i) => {
        return <Tag key={i} docId={id} name={name} tag={tag} />;
        })}
      </td>
    </tr>
  );
};

// const File = ({ id, name, path, tags }) => {
//   // express routing will convert / to the end of the param but we want the entire path as the param
//   const filePath = path.substr(1).replace('/', '~2F');
//   const url = `/api/document/${filePath}`;
//   return (
//     // <li className="list-group-item">
//     //   <a target="_blank" href={url}>{name}</a>
//     // </li>
//     <li className={tags.map(tag => tag.replace(' ', '_')).join(' ')}>
//       <a target="_blank" href={url}>
//         {name}
//       </a>
//       {tags.map((tag, i) => {
//         return <Tag key={i} docId={id} name={name} tag={tag} />;
//       })}
//     </li>
//   );
// };

export default File;
