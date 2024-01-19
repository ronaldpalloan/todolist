const addButton = document.getElementById('addButton');
const listTodo = document.querySelector('.list-todo');

addButton.addEventListener('click', function() {
	const inputTask = document.getElementById('task').value;
	const inputStart = document.getElementById('start').value;
	const inputEnd = document.getElementById('end').value;

	const perTodo = `
		<div class="per-todo">
			<div class="check"></div>
			<div class="time">
				<p>
					<span id="time-start">${inputStart}</span>
					-
					<span id="time-end">${inputEnd}</span>
				</p>
			</div>
			<p class="todo">${inputTask}</p>
			<p class="delete">X</p>
		</div>`

		listTodo.innerHTML += perTodo;
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
	localStorage.setItem('data', listTodo.innerHTML);
}

function showData() {
	listTodo.innerHTML = localStorage.getItem('data')
}

showData();

