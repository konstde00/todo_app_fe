import {TaskModel} from "@app/src/app/models/task.model";
import {Pagination} from "@app/src/app/models/pagination";
import {Metadata} from "@app/src/app/models/metadata.model";
import {UserModel} from "@app/src/app/models/user.model";

export class PaginatedUsers {

  items: UserModel[];
  metadata: Metadata;
}
