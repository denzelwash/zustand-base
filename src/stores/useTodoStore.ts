import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface Todo {
	id: number
	todo: string
	completed: boolean
	userId: number
}

interface InitialState {
	todos: Todo[]
	isLoading: boolean
}

interface Actions {
	loadTodo: () => Promise<void>
	completeTodo: (todoId: number) => void
	deleteTodo: (todoId: number) => void
}

interface TodoState extends InitialState, Actions {}

const initialState: InitialState = {
	todos: [],
	isLoading: false
}

const todoStore: StateCreator<
	TodoState,
	[['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
	...initialState,
	loadTodo: async () => {
		set({ isLoading: true }, false, 'fetchTodos')
		try {
			const response = await fetch('https://dummyjson.com/todos?limit=10')
			const data = await response.json()
			set({ todos: data.todos }, false, 'fetchTodos/success')
		} catch (error) {
			console.log(error)
			set({ todos: [] }, false, 'fetchTodos/failed')
		} finally {
			set({ isLoading: false }, false, 'fetchTodos/finally')
		}
	},
	completeTodo: (todoId) => {
		set(
			(state) => {
				const todo = state.todos.find((todo) => todo.id === todoId)
				if (todo) {
					todo.completed = !todo.completed
				}
			},
			false,
			'completeTodo'
		)
	},
	deleteTodo: (id: number) => {
		set(
			(state) => {
				const index = state.todos.findIndex((todo) => todo.id === id)
				if (index !== -1) {
					state.todos.splice(index, 1)
				}
			},
			false,
			'deleteTodo'
		)
	}
})

const useTodoStore = create<TodoState>()(immer(devtools(persist(todoStore, { name: 'todos-storage' }))))

const useTodos = () => useTodoStore((state) => state.todos)
const useIsLoading = () => useTodoStore((state) => state.isLoading)
const loadTodo = () => useTodoStore.getState().loadTodo()
const completeTodo = (todoId: number) => useTodoStore.getState().completeTodo(todoId)
const deleteTodo = (todoId: number) => useTodoStore.getState().deleteTodo(todoId)

export { useTodoStore, useTodos, useIsLoading, loadTodo, completeTodo, deleteTodo }
