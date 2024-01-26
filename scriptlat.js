const addButton = document.getElementById('addButton');
const listTodo = document.querySelector('.list-todo');
const inputTask = document.getElementById('task');
const inputStart = document.getElementById('start');
const inputEnd = document.getElementById('end');
const afterInputTask = document.querySelector('.after-input-task');
const afterInputTime = document.querySelector('.after-input-time')
const labelTask = document.querySelector('label[for="task"]');

// Jika Tombol Add diklik
addButton.addEventListener('click', function() {
	if (inputTask.value === '' || inputStart.value === '' || inputEnd.value === '') {
		afterInputTask.style.display = 'block';
		afterInputTime.style.display = 'block';

		let inputValue = [inputTask, inputStart, inputEnd];
		inputValue.forEach(a => {
			if (a.value === '') {
				a.classList.add('red-form');
				scrollKe(labelTask);
			}
		})
	}

	else if (inputTask.value !== '' && inputStart.value !== '' && inputStart.value.length === 5 && inputStart.value.charAt(2) === ':' && inputEnd.value !== '' && inputEnd.value.length === 5 && inputEnd.value.charAt(2) === ':'){
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
		}
})

// Validasi Input Task
inputTask.addEventListener('input', function() {
	if (inputTask.value === '') {
		inputTask.classList.add('red-form');
		afterInputTask.style.display = 'block';

	} else {
		inputTask.classList.remove('red-form');
		afterInputTask.style.display = 'none';
	}
})

// Validasi Waktu Start
inputStart.addEventListener('input', function() {
	inputStart.value = inputStart.value.replace(/[^0-9:]/g, '');
	if (inputStart.value === '' || inputStart.value.length !== 5 || inputStart.value.charAt(2) !== ':') {
		inputStart.classList.add('red-form');
		afterInputTime.style.display = 'block';
	} else {
		inputStart.classList.remove('red-form');
		if (inputStart.value !== '' && inputEnd.value !== '') {
			afterInputTime.style.display = 'none';
		}
	}
})

// Validasi Waktu End
inputEnd.addEventListener('input', function() {
	inputEnd.value = inputEnd.value.replace(/[^0-9:]/g, '');
	if (inputEnd.value === '' || inputEnd.value.length !== 5 || inputEnd.value.charAt(2) !== ':') {
		inputEnd.classList.add('red-form');
		afterInputTime.style.display = 'block';
	} else {
		inputEnd.classList.remove('red-form');
		if (inputStart.value !== '' && inputEnd.value !== '') {
			afterInputTime.style.display = 'none';
		}
	}
})

// FITUR EDIT
document.addEventListener('dblclick', function(e) {
	if (e.target.classList.contains('todo')) {		
		editTodo(e.target);
	} else if (e.target.id === 'time-start' || e.target.id === 'time-end') {
		editTodo(e.target);
	};

	saveData();
})


// Ketika Tugas Selesai atau mau dihapus
document.addEventListener('click', function(e) {
	if (e.target.classList.contains('check')) {
		e.target.classList.toggle('checked');

		e.target.nextElementSibling.classList.toggle('linethrough');
		e.target.nextElementSibling.nextElementSibling.classList.toggle('linethrough');
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

function scrollKe(tujuan) {
	window.scrollTo({
		top: tujuan.offsetTop,
		behavior: 'smooth'
	})
}

function editTodo(todoElement) {
	const isiAwalEdit = todoElement.innerText;
	const createEditInput = document.createElement('input');
	createEditInput.type = 'text';
	createEditInput.value = isiAwalEdit;

	todoElement.innerHTML = '';
	todoElement.appendChild(createEditInput);
	todoElement.focus();

	createEditInput.addEventListener('blur', function() {
		todoElement.innerText = createEditInput.value;
	})
}

showData();

