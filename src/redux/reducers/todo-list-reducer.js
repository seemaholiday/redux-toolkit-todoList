import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todo:[{id:Math.random()*100,
        name:'Rice'}]
}
export const todoSlice = createSlice({
    name:'toDo',
    initialState,
    reducers:{
        addTodo:(state, action)=>{
            const todoObj={
                id:Math.random()*100,
                name:action.payload
            };
            state.todo.push(todoObj);
        },
        removeTodo:(state, action)=>{
           state.todo = state.todo.filter((item)=> item.id !== action.payload)
        },
        editTodo:(state, action)=>{
            const index = state.todo.findIndex(item => item.id === action.payload.id);
            const updatedState = [...state.todo];
            updatedState[index].name = action.payload.name;
            console.log("updatedState", updatedState, action.payload)
            state.todo = updatedState
        }
    }
})

export const {addTodo, removeTodo, editTodo} = todoSlice.actions

export default todoSlice.reducer