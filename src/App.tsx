import './App.css'
import Icons from './components/icons'
import ValueContainer from './components/value-container'
import ButtonsContainer from './components/buttons-container'
import { useEffect, useState } from 'react'

interface Todo {
	id: number
	todo: string
	completed: boolean
	userId: number
}

export default function App() {
	const [todos, setTodos] = useState<Todo[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const handleComplete = (id: number) => {
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo)))
	}

	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id))
	}

	useEffect(() => {
		setIsLoading(true)
		fetch('https://dummyjson.com/todos?limit=10')
			.then((res) => res.json())
			.then((data) => {
				setTodos(data.todos)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<>
			<Icons />
			<ValueContainer />
			<ButtonsContainer />

			<div className="todos">
				<h1>Todo List</h1>

				{!isLoading ? (
					<ul className="todo-list">
						{todos.map((todo) => (
							<li key={todo.id} className={todo.completed ? 'completed' : ''}>
								<span className={`todo-text ${todo.completed ? 'completed-text' : ''}`}>{todo.todo}</span>
								<div className="actions">
									<button onClick={() => handleComplete(todo.id)}>{todo.completed ? '✅' : '☑️'}</button>
									<button onClick={() => handleDelete(todo.id)}>❌</button>
								</div>
							</li>
						))}
					</ul>
				) : (
					'Загрузка...'
				)}
			</div>
		</>
	)
}
