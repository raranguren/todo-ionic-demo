import { TodoItem } from "../model/todo-item.model";

export class TodoListViewModel {
    list : TodoItem[] = [];
    editMode = false;
    createMode = false;
    editingIndex? : number;
    editingText = "";
}