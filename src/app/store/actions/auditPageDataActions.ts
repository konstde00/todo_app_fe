import { IAuditPageDataCollection } from '@app/models/dataCollection/auditPageDataCollection';
import { ActionTypes } from '@app/store/constants/actionTypes';
import { IPageProfile } from 'models/tagModels/pageDetails';
import * as angular from 'angular';

export const setAuditPageDataCollection = (uuid: string, auditPageDataCollection: IAuditPageDataCollection) => {
  return {
    type: ActionTypes.SET_AUDIT_PAGE_DATA_COLLECTION,
    payload: {
      uuid,
      auditPageDataCollection
    }
  };
};

export const setAuditPageInformation = (runId: number, pageId: string, pageInformation: IPageProfile) => {
  return {
    type: ActionTypes.SET_AUDIT_PAGE_INFORMATION,
    payload: {
      runId,
      pageId,
      pageInformation
    }
  };
};
