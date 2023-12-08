import { useState } from "react"

import { PlusIcon } from '@heroicons/react/24/outline'

import { useTodo } from "@hooks"

const TodoForm = () => {
  const [title, setTitle] = useState("")
  const { addTodoItem } = useTodo()

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (title) {
      addTodoItem(title)
      setTitle("")
    }
  }

  const onChangeInputTitle = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(value)
  }

  return (
    <div className="flex items-center w-full">
      <form className="flex" onSubmit={onSubmitForm}>
        <button className="text-sm font-medium">
          <span className="flex items-center cursor-pointer justify-center w-5 h-5">
            <PlusIcon />
          </span>
        </button>
        <input name='title' value={title} onChange={onChangeInputTitle} className="flex-grow ml-4 bg-transparent focus:outline-none font-medium" type="text" placeholder="add a new todo" />
      </form>
    </div>
  )
}

export default TodoForm