import React from 'react';

function ContainedButtons(props) {
  return <div onClick={props.onLogout}>{props.children}</div>;
}

export default ContainedButtons;
