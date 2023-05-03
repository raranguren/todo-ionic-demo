/**
 * Represents an item in the todo list.
 * 
 * @property {string} description - The text description of the item.
 * @property {boolean} completed - Whether the todo item is completed or not.
 */
export class TodoItem {
    description: string;
    completed: boolean;
  
    constructor(description: string, completed = false) {
      this.description = description;
      this.completed = completed;
    }
  }
  
