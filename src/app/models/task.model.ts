import {TaskStatusEnum} from "@app/src/app/models/task-status-enum.model";
import {TaskPriorityEnum} from "@app/src/app/models/task-priority-enum.model";

export class TaskModel {

  id: number;
  title: string;
  position: number;
  description?: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;

  constructor(name: string, description: string, priority: TaskPriorityEnum, status: TaskStatusEnum) {
    this.title = name;
    this.status = status;
    this.priority = priority;
    this.description = description;
  }
}
