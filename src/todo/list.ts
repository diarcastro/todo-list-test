import { Item, EItemPriority } from './item';

const LS_ITEMS_KEY = 'TODOListTest';
const SAVE_BUTTON_SELECTOR = '.saveBtn';
const TITLE_SELCTOR = '.todoList__inputText--title';
const PRIORITY_SELCTOR = '.todoList__select';
const DEADLINE_SELCTOR = '.todoList__inputText--deadline';

export default class List {
    items: Item[];
    element: HTMLElement;
    form: HTMLElement;

    private saveButton: HTMLElement;
    private _titleElement: HTMLInputElement;
    private _priorityElement: HTMLSelectElement;
    private _deadlineElement: HTMLInputElement;
    private _editingItem: Item;

    private _editItemBind: any;
    private _deleteItemBind: any;

    constructor(element: HTMLElement, form: HTMLElement) {
        this.element = element;
        this.form = form;
        this.saveButton = form.querySelector(SAVE_BUTTON_SELECTOR);
        this._titleElement = this.form.querySelector(TITLE_SELCTOR) as HTMLInputElement;
        this._priorityElement = this.form.querySelector(PRIORITY_SELCTOR) as HTMLSelectElement;
        this._deadlineElement = this.form.querySelector(DEADLINE_SELCTOR) as HTMLInputElement;

        this._editItemBind = this.editItem.bind(this);
        this._deleteItemBind = this.deleteItem.bind(this);


        this.saveButton.addEventListener('click', this._parseForm.bind(this));
        this._getTaksFromLS();
        this._drawDom();
    }

    addItem(item: Item) {
        const editingId = this._editingItem && this._editingItem.id;
        if (editingId !== item.id) {
            this.items = [item, ...this.items];
            this._drawDom(item);
        }else {
            this._drawDom();
        }
        this._saveItemsToLS();
    }

    editItem(event: MouseEvent) {
        this._editingItem = this._getItemByEvent(event);
        this._titleElement.value = this._editingItem.title;
        this._priorityElement.value = this._editingItem.priority;
        this._deadlineElement.value = this._editingItem.deadline;
    }

    deleteItem (event: MouseEvent) {
        if (confirm('Do you really want to remove this item?')) {
            const item = this._getItemByEvent(event);
            const itemId = item && item.id;
            this.items = this.items.filter(item => item.id != itemId);
            this._drawDom();
            this._saveItemsToLS();
        }
    }

    private _getItemByEvent (event: MouseEvent): Item | null {
        const target = event.currentTarget as HTMLAnchorElement;
        const id = target.getAttribute('data-id');
        const item = id && this.items.find(item => item.id === Number(id));
        return item;
    }

    private _parseForm() {
        let item: Item = new Item();
        if (this._editingItem) {
            item = this._editingItem;
        } else {
            item.id = new Date().getTime();
        }

        item.title = this._titleElement?.value;
        item.priority = this._priorityElement?.value as EItemPriority;
        item.deadline = this._deadlineElement?.value;
        this.addItem(item);

        this._titleElement.value = '';
        this._priorityElement.value = '';
        this._deadlineElement.value = '';
        this._editingItem = null;
    }

    private _drawDom(item?: Item) {
        let template = '';
        if (item) {
            template+= item.getTemplate();
            const currentMarkup = this.element.innerHTML;
            this.element.innerHTML = template + currentMarkup;
        } else {
            for (let item of this.items){
                template+= item.getTemplate();
            }
            this.element.innerHTML = template;
        }
        this._addEvents();
    }

    private _getTaksFromLS () {
        const itemsString = localStorage.getItem(LS_ITEMS_KEY);
        const items: Item[] = (itemsString && JSON.parse(itemsString)) || [];
        this.items = [];
        for (let item of items) {
            const newItem = new Item();
            newItem.id = item.id;
            newItem.title = item.title;
            newItem.priority = item.priority;
            newItem.deadline = item.deadline;
            this.items.push(newItem);
        }
    }

    private _addEvents () {
        const editButtons = this.element.querySelectorAll('a.edit');
        const deleteButtons = this.element.querySelectorAll('a.delete');

        if(editButtons && editButtons.length) {
            for(let button of editButtons) {
                button.removeEventListener('click', this._editItemBind);
                button.addEventListener('click', this._editItemBind);
            }
        }
        if(deleteButtons && deleteButtons.length) {
            for(let button of deleteButtons) {
                button.removeEventListener('click', this._deleteItemBind);
                button.addEventListener('click', this._deleteItemBind);
            }
        }
    }

    private _saveItemsToLS () {
        const itemsString = JSON.stringify(this.items);
        localStorage.setItem(LS_ITEMS_KEY, itemsString);
    }
}