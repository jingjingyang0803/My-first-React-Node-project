import useEffect from "react"

const Tasks = () => {
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`http://localhost:5000/api/v1/tasks`)
      console.log(response)
      const data = await response.json()
      console.log(data)
    }
    fetchTodos()
   }, [])
};

// export default Tasks