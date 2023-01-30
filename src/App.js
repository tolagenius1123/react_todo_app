import "./App.css"
import React from "react"
import { useState } from "react"

function App() {
	const [todos, setTodos] = useState(
		() => JSON.parse(localStorage.getItem("todos")) ?? []
	)
	const [todo, setTodo] = useState("")
	const [todoEditing, setTodoEditing] = useState(null)
	const [editingText, setEditingText] = useState("")

	const handleSave = (e) => {
		e.preventDefault()

		const newTodo = {
			id: new Date().getTime(),
			text: todo,
			completed: false,
		}

		localStorage.setItem(
			"todos",
			JSON.stringify([...todos].concat(newTodo))
		)
		setTodos(JSON.parse(localStorage.getItem("todos")))
		setTodo("")
	}

	const handleDelete = (id) => {
		const updatedTodos = [...todos].filter((todo) => todo.id !== id)
		localStorage.setItem("todos", JSON.stringify(updatedTodos))
		setTodos(JSON.parse(localStorage.getItem("todos")))
	}

	const toggleCompleted = (id) => {
		const updatedTodos = [...todos].map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed
			}
			return todo
		})
		localStorage.setItem("todos", JSON.stringify(updatedTodos))
		setTodos(JSON.parse(localStorage.getItem("todos")))
	}

	const saveEditedTodo = (id) => {
		const updatedTodos = [...todos].map((todo) => {
			if (todo.id === id) {
				todo.text = editingText
			}
			return todo
		})
		localStorage.setItem("todos", JSON.stringify(updatedTodos))
		setTodoEditing(null)
		setEditingText("")
	}

	return (
		<div id="todo-list">
			<h2>What are your plans for today?</h2>
			<form onSubmit={handleSave}>
				<input
					type="text"
					onChange={(e) => setTodo(e.target.value)}
					value={todo}
					placeholder="Type your todos here..."
				/>
				<button type="submit">Add Todo</button>
			</form>

			{todos.map((todo) => (
				<div key={todo.id} className="todo">
					<div className="todo-text">
						<input
							className="check"
							type="checkbox"
							onChange={() => toggleCompleted(todo.id)}
							checked={todo.completed}
						/>

						{todoEditing === todo.id ? (
							<input
								type="text"
								onChange={(e) => setEditingText(e.target.value)}
								value={editingText}
							/>
						) : (
							<div className="text">{todo.text}</div>
						)}
					</div>
					<div className="todo-actions">
						{todoEditing === todo.id ? (
							<button
								onClick={() => saveEditedTodo(todo.id)}
								className="save"
							>
								save
							</button>
						) : (
							<button
								onClick={() => {
									setTodoEditing(todo.id)
									setEditingText(todo.text)
								}}
								className="edit"
							>
								edit
							</button>
						)}
						<button
							className="delete"
							onClick={() => handleDelete(todo.id)}
						>
							delete
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default App
