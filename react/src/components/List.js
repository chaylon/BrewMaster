import React from 'react';

const List = props =>{
  let list = <a href={`lists/${props.list.id}`}>{props.list.name}</a>;
  let editButton = <span> | <a href={`/lists/${props.list.id}/edit`}>Edit</a></span>;
  let deleteButton = <span> | <a href="javascript:;" onClick={props.handleDelete} id={`destroy-${props.list.id}`}>Delete</a></span>;

  return(
    <div>
      {list}
      {editButton}
      {deleteButton}
    </div>
  );
};

export default List;
