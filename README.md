# ToDo App description
Users can:
1. save a new list of tasks.
2. view a specific list of tasks,by giving the list ID number.
3. update a specific list of tasks.
4. add a task after pressing the Enter key.
5. mark any task as completed, after clicking the checkbox.
6. delete any task, after clicking the "Remove" button.
7. batch mark a list of tasks as done or undone, after clicking the checkbox.
8. batch delete all completed tasks in a list, after clicking the "Clear completed tasks" button.
9. read the state of tasks in a list: completed tasks and the total tasks.


# ToDo App architecture
The `TodoList` Component has three child components -
1. `Header` - An input form to add the new todo by pressing key "Enter". An alert message will pop if a todo with empty description is going to add.
2. `List` - Displays the list of todos. The oldest todo comes at the top.
- `Item` - A single todo item that contains a checkbox to mark the done/undone state and a delete button to remove the todo from list. It's the child component of `List`.
3. `Footer` - A component that displays the changing state of "total tasks completed/total number of tasks in the list"(read-only). It also contains a checkbox for batch marking, and a delete button for removing all completed todos.

`Header`, `List`, and `Footer` are siblings and they all need to have access to the common state, we keep the main state in the `TodoList` component.


**Team 10** 
- Jingjing Yang
- Josef Polasek

**Team 10:** Jingjing Yang, Josef Polasek


**Remote URL**
- frontend: 
- http://172.16.7.230:8080
- http://22wsp3005projectteam10.student.titeweb:8080

- backend: 
- http://172.16.7.230:4040
- http://22wsp3005projectteam10.student.titeweb:4040


**Endpoints**
- http://localhost:5000/api/v1/tasks
- http://localhost:5000/api/v1/tasks:id
- http://localhost:5000/api/v1/task/list:id

## Installation
**To run these apps in docker separately:**
1. In `~/backend` run `docker build -t backend .`
2. then execute `docker run -d -p 5000:5000 backend`
3. visit http://localhost:5000 and you can see that backend is up and running.  
4. In `~/frontend` run `docker build -t frontend .`
5. then execute `docker run -d -p 3000:3000 frontend`
6. visit http://localhost:3000 and you can see that frontend is up and running.

**To run both services together:**
1. From project directory run `docker-compose up -d`
2. visit http://localhost:5000 and http://localhost:3000 
3. you can see both backend and frontend are up and running.

## Dependencies installed
- "nanoid": "^4.0.0"
- "mongoose": "^6.8.0"

## Completed Phases
- Phase 1 --- Initial setup (5p)
- Phase 2 --- Dockerize localhost (5 p)
- Phase 3 --- CI/CD Pipeline & Remote Server (5 p)
- Phase 4 --- Implement the ToDo app (10 p)
- Phase 5 --- Testing (5 p)
- Phase 6 --- Database (5 p)

## Expected project grade
/+ grade 6(35p)
- Our team completed all the phases before deadline.

