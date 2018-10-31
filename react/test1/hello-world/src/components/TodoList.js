import React from 'react';

export default ({ addItem }) => {
  let input = {};

  return (
    <div className="todoListMain">
      <div className="header">
        <form
          onSubmit={event => {
            event.preventDefault();
            addItem(input.value);
            input.value = '';
          }}
        >
          <input placeholder="Task" ref={node => (input = node)} />
          <button type="submit">Add task</button>
        </form>
      </div>
    </div>
  );
};
