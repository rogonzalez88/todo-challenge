import { Provider } from 'react-redux'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { store } from '@store'
import { TodoPage } from '@pages'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <TodoPage />
      </Provider>
    </DndProvider>
  )
}

export default App
