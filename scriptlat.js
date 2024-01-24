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
	// Jika inputTask kosong
	// if (inputTask.value === '' && inputStart.value === '' && inputEnd.value === '') {
	// 	inputTask.classList.add('red-form');
	// 	afterInputTask.style.display = 'block';
	// 	inputStart.classList.add('red-form');
	// 	afterInputTime.style.display = 'block';
	// 	inputEnd.classList.add('red-form');
	// 	afterInputTime.style.display = 'block';
	// 	scrollKe(labelTask);
	// } else if (inputStart.value === '' && inputEnd.value === '') {
	// 	inputStart.classList.add('red-form');
	// 	afterInputTime.style.display = 'block';
	// 	inputEnd.classList.add('red-form');
	// 	afterInputTime.style.display = 'block';
	// 	scrollKe(inputStart);
	// } else if (inputTask.value === '') {
	// 	inputTask.classList.add('red-form');
	// 	afterInputTask.style.display = 'block';
	// 	scrollKe(labelTask);
	// } else if (inputStart.value === '') {
	// 	inputStart.classList.add('red-form');
	// 	afterInputTime.style.display = 'block';
	// 	scrollKe(inputStart);
	// } else if (inputEnd.value === '') {
	// 	inputEnd.classList.add('red-form');
	// 	afterInputTime.style.display = 'block';
	// 	scrollKe(inputEnd);
	// }
	if (inputTask.value === '' || inputStart.value === '' || inputEnd.value === '') {
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

// Ketika Tugas Selesai atau mau dihapus
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

function scrollKe(tujuan) {
	window.scrollTo({
		top: tujuan.offsetTop,
		behavior: 'smooth'
	})
}

showData();


