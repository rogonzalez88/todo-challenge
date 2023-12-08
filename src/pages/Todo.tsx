import { Header, Layout, TodoForm, TodoList } from "@components"

const TodoPage = () => {

  return (
    <Layout>
      <Header />
      <TodoForm />
      <TodoList />
    </Layout>
  )
}

export default TodoPage