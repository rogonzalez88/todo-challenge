/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'

import { TrashIcon, CheckIcon, PencilSquareIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import type { Identifier, XYCoord } from 'dnd-core'
import { useDrag, useDrop } from 'react-dnd'

import { useTodo } from "@hooks"
import { Todo } from "@models"

type TodoWithIndex = Todo & { index: number }

const TodoItem = (todo: TodoWithIndex) => {
  const [enableEdition, setEnabledEdition] = useState(false)
  const { removeTodoItem, updateTodoItem, reorderItems } = useTodo()
  const [title, setTitle] = useState(todo.title);
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
  TodoWithIndex,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'TODO',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: TodoWithIndex, monitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = todo.index
      if (dragIndex === hoverIndex) return
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
      reorderItems(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'TODO',
    item: () => ({ ...todo }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const onMarkAsDoneClick = () => {
    updateTodoItem({ ...todo, done: !todo.done })
  }

  const onRemoveClick = () => {
    removeTodoItem(todo)
  }

  const onEditClick = () => {
    if (enableEdition) {
      updateTodoItem({ ...todo, title })
    }
    setEnabledEdition(!enableEdition)
  }

  const onChangeInputTitle = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(value)
  }

  drag(drop(ref))

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.2 : 1 }} data-handler-id={handlerId}>
      <input className="hidden" type="checkbox" checked={todo.done} readOnly />
      <label className="flex items-center h-10 px-2 rounded hover:bg-gray-100">
        <span className="flex items-center cursor-pointer justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full" onClick={(onMarkAsDoneClick)}>
          <CheckIcon />
        </span>
        {enableEdition ? <input name='title' onChange={onChangeInputTitle} className="flex-grow ml-4 bg-transparent focus:outline-none font-medium" type="text" value={title} /> : <span className="ml-4 text-sm flex-1">{todo.title}</span>}
        <span className="flex items-center cursor-pointer justify-center w-5 h-5" onClick={onEditClick}>
          {enableEdition ? <CheckIcon /> : <PencilSquareIcon />}
        </span>
        <span className="flex items-center cursor-pointer justify-center ml-2 w-5 h-5" onClick={onRemoveClick}>
          <TrashIcon />
        </span>
        <span className="flex items-center cursor-move justify-center ml-2 w-5 h-5">
          <ArrowsUpDownIcon />
        </span>
      </label>
    </div>
  )
}

export default TodoItem