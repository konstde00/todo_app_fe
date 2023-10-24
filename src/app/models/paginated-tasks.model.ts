import {TaskModel} from "@app/src/app/models/task.model";
import {Pagination} from "@app/src/app/models/pagination";
import {Metadata} from "@app/src/app/models/metadata.model";

export class PaginatedTasks {

  items: TaskModel[];
  metadata: Metadata;
}
