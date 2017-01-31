import React from 'react';

const List = props =>{
  let list = <a href={`lists/${props.list.id}`}>{props.list.name}</a>;

  return(
    <div>
      {list}
    </div>
  );
};

export default List;
