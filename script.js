const inputBox = document.getElementById('input-box');
const buttonAdd = document.querySelector('.row button');
const tasks = document.getElementById('list-container')

buttonAdd.addEventListener('click', function () {
	if (inputBox.value === '') {
		alert('Write something');
	} else {
		let li = document.createElement('li');
		li.innerHTML = inputBox.value;
		tasks.appendChild(li);

		let span = document.createElement('span');
		span.innerHTML = '\u00d7';
		li.appendChild(span);
	}
	inputBox.value = ''; 
	saveData();
})

tasks.addEventListener('click', function(e) {
	if (e.target.tagName === 'LI') {
		e.target.classList.toggle('checked');
	} else if (e.target.tagName === 'SPAN') {
		e.target.parentElement.remove();
	}

	saveData();
});

function saveData() {
	localStorage.setItem('data', tasks.innerHTML);
}

function showData() {
	tasks.innerHTML = localStorage.getItem('data');
}

showData();