import { TodoItem } from "@components"
import { useTodo } from "@hooks"
import { Todo } from "@models"


const TodoList = () => {
  const { list } = useTodo()
  return (
    <div className="mt-3">
      {list.map((todo: Todo, index: number) => (<TodoItem key={todo.id} {...todo} index={index} />))}
    </div>
  )
}

export default TodoList