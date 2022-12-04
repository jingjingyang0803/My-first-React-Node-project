const List = (props) => {
  // tasks.map((e => e.title))
  const todos = props.tasks.map((todo, index) => {
    // console.log(todo.title, index, index)
    return (
      <Todo content={todo.title} key={index} id={index} onDelete={props.onDelete} />
    );
  });

  return <div className="list-wrapper">{todos}</div>;
};

const completeTask = (e) => {
  console.log("It works!", e.target);
};

// const handleDelete = (index) => {
//   const newArr = [...this.state.tasks];
//   newArr.splice(index, 1);
//   this.setState({ tasks: newArr });
// };

const Todo = (props) => {
  return (
    <div className="list-item" onClick={(e) => completeTask(e)}>
      {props.content}
      <button
        class="delete is-pulled-right"
        onClick={() => {
          props.onDelete(props.id);
        }}
      />
    </div>
  );
};

export { List };
