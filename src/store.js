import { configureStore } from '@reduxjs/toolkit'
import countReducer from './redux/reducers/count-reducer'
import todoListReducer from './redux/reducers/todo-list-reducer'
export const store = configureStore({
  reducer: {
    counter:countReducer,
    todoList:todoListReducer
  },
})