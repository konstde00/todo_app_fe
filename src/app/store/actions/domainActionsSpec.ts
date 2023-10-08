import { mock } from 'angular';
import { Names } from '@app/moonbeamConstants';
import * as Immutable from 'immutable';
import { ActionTypes } from '@app/store/constants/actionTypes';

'use strict';

describe('domain actions spec', () => {
  let service;
  let provider;
  let mockState;
  let dispatchSpy;
  let $rootScope;
  let $q;
  let domainsServiceSpy;

  let mockDomains;

  beforeEach(mock.module('moonbeamModule', function ($provide) {
    provider = $provide;
    mockState = {
      domains: Immutable.Map()
    };
    mockDomains = [{
      id: 1,
      folderId: 1,
      name: 'mock domain',
      automatedJourneys: 1,
      guidedJourneys: 1,
    }];
    createSpy();
  }));

  beforeEach(inject((_domainActionsService_, _$rootScope_, _$q_) => {
    service = _domainActionsService_;
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  function createSpy() {
    domainsServiceSpy = jasmine.createSpyObj('domainServiceSpy', [
      'getDomains',
      'createDomain',
      'updateDomain',
      'removeDomain'
    ]);

    domainsServiceSpy.getDomains.and.callFake(() => $q.resolve(mockDomains));
    domainsServiceSpy.createDomain.and.callFake(() => $q.resolve(mockDomains[0]));
    domainsServiceSpy.updateDomain.and.callFake(() => $q.resolve(mockDomains[0]));
    domainsServiceSpy.removeDomain.and.callFake(() => $q.resolve(true));

    dispatchSpy = jasmine.createSpy('dispatchSpy');

    provider.value(Names.Services.domains, domainsServiceSpy);
  }

  describe('already has data', () => {
    beforeEach(() => {
      mockState.domains = mockState.domains.set('all', Immutable.fromJS(mockDomains));
    });

    it('should not get domains', () => {
      service.getDomainsIfNeeded(mockState)(dispatchSpy);
      $rootScope.$digest();
      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('creates a domain', () => {
      service.createDomain({ name: 'new domain' })(dispatchSpy);
      $rootScope.$digest();
      expect(domainsServiceSpy.createDomain).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({ type: ActionTypes.ADD_DOMAIN }));
    });

    it('updates a domain', () => {
      service.updateDomain({ id: 1, name: 'domain' })(dispatchSpy);
      $rootScope.$digest();
      expect(domainsServiceSpy.updateDomain).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({ type: ActionTypes.UPDATE_DOMAIN }));
    });

    it('deletes a domain', () => {
      service.deleteDomain(1)(dispatchSpy);
      $rootScope.$digest();
      expect(domainsServiceSpy.removeDomain).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({ type: ActionTypes.DEL_DOMAIN }));
    });
  });

  describe('does not have data', () => {
    it('should get domains', () => {
      service.getDomainsIfNeeded(mockState)(dispatchSpy);
      $rootScope.$digest();
      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({ type: ActionTypes.SET_DOMAINS }));
    });
  });
});
