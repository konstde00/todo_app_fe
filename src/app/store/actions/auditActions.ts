import * as angular from 'angular';

import { AngularNames, Names } from '@app/moonbeamConstants';
import { IAuditModel } from '../../components/modals/modalData';
import { IReduxAction } from '../reducers/reducers';
import { ActionTypes } from '../constants/actionTypes';
import { IDiscoveryAuditService } from '../../components/domains/discoveryAudits/discoveryAuditService';
import { IAuditDataService } from '../../components/domains/discoveryAudits/reporting/services/auditDataService/auditDataService';
import { IAuditSelector } from '../selectors/auditSelectorService';
import { IEditAudit, INewAudit } from '@app/components/audit/audit.models';

export class AuditActions {
  static setAudits = (
    payload: Array<IAuditModel>
  ): IReduxAction<Array<IAuditModel>> => {
    return {
      type: ActionTypes.SET_AUDITS,
      payload
    };
  }

  static setAuditLabels = (auditId, labels) => {
    return {
      type: ActionTypes.SET_AUDIT_LABELS,
      payload: {
        auditId,
        labels
      }
    };
  }

  static deleteAuditLabel = (auditId, labelId) => {
    return {
      type: ActionTypes.DEL_AUDIT_LABEL,
      payload: {
        auditId,
        labelId
      }
    };
  }

  static updateAudit = (payload: IAuditModel) => {
    return {
      type: ActionTypes.UPDATE_AUDIT,
      payload
    };
  }

  static addAudit = (payload: IAuditModel) => {
    return {
      type: ActionTypes.ADD_AUDIT,
      payload
    };
  }

  static deleteAudit = (auditId: number, domainId: number) => {
    return {
      type: ActionTypes.DEL_AUDIT,
      payload: {
        auditId,
        domainId
      }
    };
  }

  static setSelected = auditId => {
    return {
      type: ActionTypes.SET_SELECTED_AUDIT,
      payload: auditId
    };
  }
}

export abstract class IAuditActionsService {
  abstract getAuditsIfNeeded(state: any);
  abstract createAudit(audit: INewAudit);
  abstract updateAudit(audit: IEditAudit);
  abstract setSelected(auditId: number);
}
export class AuditActionsService extends IAuditActionsService {
  static $inject = [
    Names.Services.discoveryAudit,
    Names.Services.auditData,
    Names.Services.auditSelector,
    AngularNames.q
  ];

  constructor(
    private auditService: IDiscoveryAuditService,
    private auditDataService: IAuditDataService,
    private auditSelector: IAuditSelector,
    private $q: angular.IQService
  ) {
    super();
  }

  getAuditsIfNeeded(state) {
    return dispatch => {
      if (this.auditSelector.selectAudits(state)) {
        return this.$q.resolve(this.auditSelector.selectAudits(state));
      }

      return this.auditService.getAudits().then(audits => {
        dispatch(AuditActions.setAudits(audits));
        return audits;
      });
    };
  }

  createAudit(audit: INewAudit) {
    return dispatch => {
      return this.auditService.createAudit(audit).then(createdAudit => {
        dispatch(AuditActions.addAudit(createdAudit));
        return createdAudit;
      });
    };
  }

  updateAudit(audit: IEditAudit) {
    return dispatch => {
      return this.auditDataService.updateAudit(audit).then(updatedAudit => {
        dispatch(AuditActions.updateAudit(updatedAudit));
        return updatedAudit;
      });
    };
  }

  setSelected(auditId: number) {
    return dispatch => {
      dispatch(AuditActions.setSelected(auditId));

      return auditId;
    };
  }

  static setAuditLabels = (auditId, labels) => {
    return {
      type: ActionTypes.SET_AUDIT_LABELS,
      payload: {
        auditId,
        labels
      }
    };
  }

  static deleteAuditLabel = (auditId, labelId) => {
    return {
      type: ActionTypes.DEL_AUDIT_LABEL,
      payload: {
        auditId,
        labelId
      }
    };
  }
}
