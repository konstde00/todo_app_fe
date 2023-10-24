import {TaskPriorityEnum} from "@app/src/app/models/task-priority-enum.model";
import {StatusItem} from "@app/src/app/models/status-item.model";

export class StatusByPriorityItem {

    priority: TaskPriorityEnum;

    statusItems: StatusItem[];
}
