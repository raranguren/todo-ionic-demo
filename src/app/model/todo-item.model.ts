export class TodoItem {
    description: string = "";
    completed: boolean = false;

    constructor(description: string) {
        this.description = description;
    }
}