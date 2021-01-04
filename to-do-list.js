let button = document.querySelector('button');
let text = document.querySelector('#add');
let taskList = document.querySelector('#list');
function makeTask(text, isCrossed) {
	let newTask = document.createElement('span');
	let lineBreak = document.createElement('hr');
	let deleteButton = document.createElement('button');
	let completedButton = document.createElement('button');
	let task = document.createElement('task');
	newTask.innerText = text;
	task.append(newTask);
	task.append(completedButton);
	task.append(deleteButton);
	task.append(lineBreak);
	taskList.append(task);
	newTask.style.backgroundColor = '#212121';
	newTask.style.padding = '10px';
	newTask.style.borderRadius = '5px';
	completedButton.style.borderRadius = '5px';
	completedButton.style.marginLeft = '20px';
	completedButton.innerText = 'Complete';
	completedButton.style.fontSize = '25px';
	completedButton.style.backgroundColor = '#757575';
	completedButton.style.color = 'white';
	deleteButton.style.borderRadius = '5px';
	deleteButton.style.marginLeft = '20px';
	deleteButton.innerText = 'Delete';
	deleteButton.style.fontSize = '25px';
	deleteButton.style.backgroundColor = '#757575';
	deleteButton.style.color = 'white';
	if (isCrossed) {
		newTask.classList.add('cross');
	}
}

function updateLocalStorage() {
	let listTasks = [];
	for (tasks of taskList.children) {
		listTasks.push(tasks.firstElementChild.innerText);
	}
	localStorage.setItem('taskList', JSON.stringify(listTasks));
	let listCrossed = [];
	for (crosses of taskList.children) {
		if (crosses.firstElementChild.classList.contains('cross')) {
			listCrossed.push(true);
		} else {
			listCrossed.push(false);
		}
	}
	localStorage.setItem('crossList', JSON.stringify(listCrossed));
}
if (localStorage.getItem('taskList')) {
	let listOfTasks = JSON.parse(localStorage.getItem('taskList'));
	let listOfCrosses = JSON.parse(localStorage.getItem('crossList'));
	for (let items in listOfTasks) {
		makeTask(listOfTasks[items], listOfCrosses[items]);
	}
}

button.addEventListener('click', function(event) {
	event.preventDefault();
	if (text.value !== '') {
		makeTask(text.value, false);
		updateLocalStorage();
	}
	text.value = '';
});

taskList.addEventListener('click', function(event) {
	event.preventDefault();
	if (event.target.innerText === 'Delete') {
		event.target.parentElement.remove();
	} else {
		if (event.target.parentElement.firstElementChild.nextElementSibling.innerText === 'Complete') {
			event.target.parentElement.firstElementChild.classList.toggle('cross');
		}
	}
	updateLocalStorage();
});
