import { AngularNames, Names } from '@app/moonbeamConstants';
import { IFolder, IFoldersApiService, INewFolder } from '../../components/folder/foldersApiService';
import { IReduxAction } from '../reducers/reducers';
import { ActionTypes } from '../constants/actionTypes';
import { IFolderSelector } from '../selectors/folderSelectorService';
import * as angular from 'angular';


export class FolderActions {
  static setFolders = (payload: Array<IFolder>): IReduxAction<Array<IFolder>> => {
    return {
      type: ActionTypes.SET_FOLDERS,
      payload
    };
  };

  static addFolder = (payload: IFolder) => {
    return {
      type: ActionTypes.ADD_FOLDER,
      payload
    };
  };

  static updateFolder = (payload: IFolder) => {
    return {
      type: ActionTypes.UPDATE_FOLDER,
      payload
    };
  }

  static deleteFolder = (payload: number) => {
    return {
      type: ActionTypes.DEL_FOLDER,
      payload
    };
  }
}

export abstract class IFolderActionsService {
  abstract getFoldersIfNeeded(state: any);
  abstract createFolder(req: INewFolder);
  abstract updateFolder(folder: IFolder);
  abstract deleteFolder(folderId: number);
}

export class FolderActionsService extends IFolderActionsService {
  static $inject = [
    AngularNames.q,
    Names.Services.foldersApi,
    Names.Services.folderSelector
  ];

  constructor(private $q: angular.IQService,
    private foldersService: IFoldersApiService,
    private folderSelector: IFolderSelector) {
    super();
  };

  getFoldersIfNeeded(state: any) {
    return dispatch => {
      let folders = this.folderSelector.selectAllFolders(state);
      if (folders) {
        return this.$q.resolve(folders);
      }

      return this.foldersService.getFolders().then(folders => {
        dispatch(FolderActions.setFolders(folders));
        return folders;
      });
    };
  }

  createFolder(req: INewFolder) {
    return dispatch => {
      return this.foldersService.createFolder(req).then(folder => {
        dispatch(FolderActions.addFolder(folder));
        return folder;
      });
    };
  }

  updateFolder(folder: IFolder) {
    return dispatch => {
      return this.foldersService.updateFolder(folder).then(updatedFolder => {
        dispatch(FolderActions.updateFolder(updatedFolder));
        return updatedFolder;
      });
    };
  }

  deleteFolder(folderId: number) {
    return dispatch => {
      return this.foldersService.removeFolder(folderId).then(success => {
        if (success) {
          dispatch(FolderActions.deleteFolder(folderId));
        }
        return success;
      });
    };
  }
}

