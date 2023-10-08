import { mock } from 'angular';
import { Names } from '@app/moonbeamConstants';
import * as Immutable from 'immutable';
import { ActionTypes } from '@app/store/constants/actionTypes';

'use strict';

describe('folder actions spec', () => {

  let service;
  let provider;
  let mockState;
  let mockFolders;
  let dispatchSpy;
  let $rootScope;
  let $q;
  let foldersApiServiceSpy;

  beforeEach(mock.module('moonbeamModule', function ($provide) {
    provider = $provide;
    mockState = {
      folders: Immutable.Map()
    };
    mockFolders = [{
      id: 1,
      name: 'mock folder'
    }];
    createSpy();
  }));

  beforeEach(inject((_folderActionsService_, _$rootScope_, _$q_) => {
    service = _folderActionsService_;
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  function createSpy() {
    foldersApiServiceSpy = jasmine.createSpyObj([
      'getFolders',
      'updateFolder',
      'createFolder',
      'removeFolder'
    ]);

    foldersApiServiceSpy.getFolders.and.callFake(() => $q.resolve(mockFolders));
    foldersApiServiceSpy.updateFolder.and.callFake(() => $q.resolve(mockFolders[0]));
    foldersApiServiceSpy.createFolder.and.callFake(() => $q.resolve(mockFolders[0]));
    foldersApiServiceSpy.removeFolder.and.callFake(() => $q.resolve(true));

    dispatchSpy = jasmine.createSpy('dispatchSpy');

    provider.value(Names.Services.foldersApi, foldersApiServiceSpy);
  }

  describe('has data', () => {
    beforeEach(() => {
      mockState.folders = mockState.folders.set('all', Immutable.fromJS(mockFolders));
    });

    it('should not get folders', () => {
      service.getFoldersIfNeeded(mockState)(dispatchSpy);
      $rootScope.$digest();
      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should create a folder', () => {
      service.createFolder({ id: 2, name: 'new folder' })(dispatchSpy);
      $rootScope.$digest();
      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({ type: ActionTypes.ADD_FOLDER }));
    });

    it('should update a folder', () => {
      service.updateFolder({ id: 1, name: 'new name' })(dispatchSpy);
      $rootScope.$digest();
      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({ type: ActionTypes.UPDATE_FOLDER }));
    });

    it('should delete a folder', () => {
      service.deleteFolder(1)(dispatchSpy);
      $rootScope.$digest();
      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({ type: ActionTypes.DEL_FOLDER }));
    });
  });

  describe('does not have data', () => {
    it('should get folders', () => {
      service.getFoldersIfNeeded(mockState)(dispatchSpy);
      $rootScope.$digest();
      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({ type: ActionTypes.SET_FOLDERS }));
    });
  });
});
