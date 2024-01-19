const addButton = document.getElementById('addButton');
const listTodo = document.querySelector('.list-todo');

addButton.addEventListener('click', function() {
	const inputTask = document.getElementById('task');
	const inputStart = document.getElementById('start');
	const inputEnd = document.getElementById('end');

	const perTodo = `
		<div class="per-todo">
			<div class="check"></div>
			<div class="time">
				<p>
					<span id="time-start">${inputStart.value}</span>
					-
					<span id="time-end">${inputEnd.value}</span>
				</p>
			</div>
			<p class="todo">${inputTask.value}</p>
			<p class="delete">X</p>
		</div>`

		listTodo.innerHTML += perTodo;
		inputTask.value = '';
		inputStart.value= '';
		inputEnd.value = '';
		saveData();
})

document.addEventListener('click', function(e) {
	if (e.target.classList.contains('check')) {
		e.target.classList.toggle('checked'); 
	}

	if (e.target.classList.contains('delete')) {
		e.target.parentElement.remove();
	}

	saveData();
})

function saveData() {
	localStorage.setItem('todo', listTodo.innerHTML);
}

function showData() {
	listTodo.innerHTML = localStorage.getItem('todo')
}

showData();

