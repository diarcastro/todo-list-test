import List from './todo/list';

const formContainer = document.querySelector('.todoList__Form') as HTMLElement;
const listContainer = document.querySelector('.todoList__list') as HTMLElement;

const list = new List(listContainer, formContainer);
