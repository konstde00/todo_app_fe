export class Task {
    id: number;
    title: string;
    description: string;
    // Add other properties as needed


  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
