import { mock } from 'angular';
import { AngularNames, Names } from '@app/moonbeamConstants';
import * as Immutable from 'immutable';
import { ActionTypes } from '@app/store/constants/actionTypes';

'use strict';

describe('AuditActionsServiceSpec', () => {

  let service;
  let provider;
  let reduxSpy;
  let discoveryAuditSpy;
  let auditDataSpy;
  let mockState;
  let dispatchSpy;
  let $rootScope;
  let $q;

  let mockAudits = [{
    id: 1,
    name: 'mock audit',
    labels: []
  }];

  beforeEach(mock.module('moonbeamModule', function ($provide) {
    provider = $provide;
    createSpy();
  }));

  beforeEach(inject((_auditActionsService_, _$rootScope_, _$q_) => {
    service = _auditActionsService_;
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  function createSpy() {
    mockState = {
      audits: Immutable.Map(),
      domains: Immutable.Map()
    };

    reduxSpy = jasmine.createSpyObj('reduxSpy', [
      'dispatch',
      'getState'
    ]);

    reduxSpy.getState.and.callFake(() => mockState);

    discoveryAuditSpy = jasmine.createSpyObj('discoveryAuditSpy', [
      'getAudits',
      'createAudit',
      'removeAudit'
    ]);

    discoveryAuditSpy.getAudits.and.callFake(() => $q.resolve(mockAudits));
    discoveryAuditSpy.createAudit.and.callFake((audit) => $q.resolve(audit));
    discoveryAuditSpy.removeAudit.and.callFake(() => $q.resolve(true));

    dispatchSpy = jasmine.createSpy('dispatchSpy');

    auditDataSpy = jasmine.createSpyObj('auditDataSpy', [
      'updateAudit'
    ]);

    auditDataSpy.updateAudit.and.callFake((audit) => $q.resolve(audit));

    provider.value(AngularNames.ngRedux, reduxSpy);
    provider.value(Names.Services.discoveryAudit, discoveryAuditSpy);
    provider.value(Names.Services.auditData, auditDataSpy);
  }


  describe('already has audits', () => {
    beforeEach(() => {
      mockState.audits = mockState.audits.set('all', Immutable.fromJS(mockAudits));
    });

    it('should not get audits', () => {
      service.getAuditsIfNeeded(mockState)(dispatchSpy);
      $rootScope.$digest();
      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should create new audit', () => {
      service.createAudit(mockState, { id: 2, name: 'audit 2' })(dispatchSpy);
      $rootScope.$apply();
      expect(discoveryAuditSpy.createAudit).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({
        type: ActionTypes.ADD_AUDIT
      }));
    });

    it('should update audit', () => {
      service.updateAudit({ id: 1, name: 'new name' })(dispatchSpy);
      $rootScope.$apply();
      expect(auditDataSpy.updateAudit).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({
        type: ActionTypes.UPDATE_AUDIT
      }));
    });
  });

  describe('does not have audits', () => {
    it('should get audits if needed', () => {
      service.getAuditsIfNeeded(mockState)(dispatchSpy);
      $rootScope.$digest();
      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({ type: ActionTypes.SET_AUDITS }));
    });
  });

  describe('set selected', () => {
    it('should set selected audit', () => {
      service.setSelected(1)(dispatchSpy);

      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({ type: ActionTypes.SET_SELECTED_AUDIT }));
    });
  });
});
