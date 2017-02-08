import React from 'react';

const List = props =>{

  let list = <div className="col-sm-6 list-list">
              <a href={`lists/${props.list.id}`}>{props.list.name}</a>
             </div>;

  let editButton;
  let deleteButton;

  if (props.user.id === props.list.user_id) {
    editButton = <span> <a href={`/lists/${props.list.id}/edit`}><i className="fa fa-pencil" aria-hidden="true"></i></a></span>;
    deleteButton = <span> <a href="javascript:;" onClick={props.handleDelete} id={`destroy-${props.list.id}`}><i className="fa fa-times" aria-hidden="true"></i></a></span>;
  }

  return(
    <div className="row list-index">
      {list}
      <div className="functions col-sm-6">
        {editButton}
        {deleteButton}
      </div>
    </div>
  );
};

export default List;
