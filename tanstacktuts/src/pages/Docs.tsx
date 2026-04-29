import { useQuery } from '@tanstack/react-query'


function fetchTodoList() {

}

function Todos() {
  const { status, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })

  if (status === 'pending') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }



  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}


function App() {
  const result = useQuery({ queryKey: ['todos'], queryFn: Todos })
}

export default App
