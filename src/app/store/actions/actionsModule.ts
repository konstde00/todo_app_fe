import { Names } from '@app/moonbeamConstants';
import * as angular from 'angular';
import { AuditActionsService } from './auditActions';
import { DomainActionsService } from './domainActions';
import { FolderActionsService } from './folderActions';
import { downgradeInjectable } from '@angular/upgrade/static';
import { SwitchAccountService } from '@app/components/account/admin/switch-account.service';

export default angular.module('actionsModule', [])
  .service(Names.Services.auditActions, AuditActionsService)
  .service(Names.Services.domainActions, DomainActionsService)
  .service(Names.Services.folderActions, FolderActionsService)
  .service(Names.NgServices.switchAccount, downgradeInjectable(SwitchAccountService))
  .name;
