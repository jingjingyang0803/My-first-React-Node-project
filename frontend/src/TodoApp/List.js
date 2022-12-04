const List = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return (
      <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
    );
  });

  return <div className="list-wrapper">{todos}</div>;
};

const completeTask = (e) => {
    console.log("Oh, hi Mark!", e.target)
}

const Todo = (props) => {
  return (
    <div className="list-item" onClick={(e) => completeTask(e)}>
        {props.content}
        <button class="delete is-pulled-right" onClick={() => {props.onDelete(props.id);}} />
    </div>
  );
};

export { List };
