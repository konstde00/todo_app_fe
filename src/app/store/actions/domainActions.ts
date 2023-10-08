import { AngularNames, Names } from '@app/moonbeamConstants';
import {
  ICreateDomainRequest,
  IDomain,
  IDomainsService,
  IUpdateDomainRequest
} from '../../components/domains/domainsService';
import { IReduxAction } from '../reducers/reducers';
import { ActionTypes } from '../constants/actionTypes';
import { IDomainSelector } from '../selectors/domainSelectorService';
import * as angular from 'angular';


export class DomainActions {
  static setDomains = (payload: Array<IDomain>): IReduxAction<Array<IDomain>> => {
    return {
      type: ActionTypes.SET_DOMAINS,
      payload
    };
  }

  static addDomain = (payload: IDomain): IReduxAction<IDomain> => {
    return {
      type: ActionTypes.ADD_DOMAIN,
      payload
    };
  }

  static updateDomain = (payload: IDomain): IReduxAction<IDomain> => {
    return {
      type: ActionTypes.UPDATE_DOMAIN,
      payload
    };
  }

  static deleteDomain = (domainId: number, folderId: number) => {
    return {
      type: ActionTypes.DEL_DOMAIN,
      payload: {
        domainId,
        folderId
      }
    };
  };
}

export abstract class IDomainActionsService {
  abstract getDomainsIfNeeded(state: any);
  abstract createDomain(req: ICreateDomainRequest);
  abstract updateDomain(req: IUpdateDomainRequest);
  abstract deleteDomain(domainId: number, folderId: number);
}

export class DomainActionsService extends IDomainActionsService {
  static $inject = [
    AngularNames.q,
    Names.Services.domainSelector,
    Names.Services.domains
  ];

  constructor(private $q: angular.IQService,
              private domainSelector: IDomainSelector,
              private domainsService: IDomainsService) {
    super();
  }

  getDomainsIfNeeded(state: any) {
    return dispatch => {
      let domains = this.domainSelector.selectDomains(state);
      if (domains) {
        return this.$q.resolve(domains);
      }

      return this.domainsService.getDomains(true).then((domains) => {
        return dispatch(DomainActions.setDomains(domains));
      });
    };
  }

  createDomain(req: ICreateDomainRequest) {
    return dispatch => {
      return this.domainsService.createDomain(req).then(domain => {
        dispatch(DomainActions.addDomain(domain));
        return domain;
      });
    };
  }

  updateDomain(req: IUpdateDomainRequest) {
    return dispatch => {
      return this.domainsService.updateDomain(req).then(domain => {
        dispatch(DomainActions.updateDomain(domain));
        return domain;
      });
    };
  }

  deleteDomain(domainId: number, folderId: number) {
    return dispatch => {
      return this.domainsService.removeDomain(domainId).then(success => {
        if (success) {
          dispatch(DomainActions.deleteDomain(domainId, folderId));
        }
        return success;
      });
    };
  }
}

