import { Inject, Injectable } from '@angular/core';
import * as ngRedux from 'ng-redux';
import { IEventManager } from '../components/eventManager/eventManager';
import { AngularNames, Events, Names } from '../constants';
import { AuthenticationActions } from '../store/actions/authenticationActions';
import { StorageService, StorageType } from './storage.service';

export interface IAuthorizationData {
  token: string;
  id: number;
  expiresAt: number;
  credentialsExpired?: boolean;
  tokenExpired?: boolean;
}

export interface IOriginalOptionalFeature {
  globalStateName: string;
  active: boolean;
}
export interface IOriginalOptionalFeatures {
  [featureName: string]: IOriginalOptionalFeature;
}

@Injectable()
export class AuthenticationService {

  constructor(@Inject(AngularNames.ngRedux) private $ngRedux: ngRedux.INgRedux,
              private storageService: StorageService,
              private eventManager: IEventManager) { }

    private returnOriginalOptionalFeatures(features: IOriginalOptionalFeatures | null) {
      for (let feature in features) {
        if (features) {
          this.storageService.setValue(features[feature].globalStateName, features[feature].active, StorageType.Local);
        }
        let payload = {
          feature: feature,
          active: features[feature].active
        };
        this.eventManager.publish(Events.featureChanged, payload);
      }
    }

    get() {
      return this.storageService.getValue<IAuthorizationData>(Names.GlobalStateKeys.authorization, StorageType.Session);
    }

  set(authorizationData: IAuthorizationData | null) {
      this.clear();
      return this.storageService.setValue<IAuthorizationData>(Names.GlobalStateKeys.authorization, authorizationData, StorageType.Session);
    }

    clear() {
      this.storageService.removeValue(Names.GlobalStateKeys.orignalAuthorization, StorageType.Session);
      this.storageService.removeValue(Names.GlobalStateKeys.originalOptionalFeatures, StorageType.Session);
      this.storageService.removeValue(Names.GlobalStateKeys.authorization, StorageType.Local);
      return this.storageService.removeValue(Names.GlobalStateKeys.authorization, StorageType.Session);
    }

  setOriginalAuth(authorizationData: IAuthorizationData | null) {
      this.storageService.setValue<IAuthorizationData>(Names.GlobalStateKeys.orignalAuthorization, authorizationData, StorageType.Session);
    }

    setOriginalOptionalFeatures(features: IOriginalOptionalFeatures) {
      this.storageService.setValue(Names.GlobalStateKeys.originalOptionalFeatures, features, StorageType.Session);
    }

    returnToOriginalAuth = () => {
      let original = this.storageService.getValue<IAuthorizationData>(Names.GlobalStateKeys.orignalAuthorization, StorageType.Session);
      let features = this.storageService.getValue<IOriginalOptionalFeatures>(Names.GlobalStateKeys.originalOptionalFeatures, StorageType.Session);
      this.returnOriginalOptionalFeatures(features);
      this.clear();
      this.set(original);
      this.$ngRedux.dispatch(AuthenticationActions.userLogout(null));
    }

    setId(authorizationId: number) {
      return this.storageService.setValue<number>(Names.GlobalStateKeys.authorizationId, authorizationId, StorageType.Session);
    }

    getId() {
      return this.storageService.getValue<number>(Names.GlobalStateKeys.authorizationId, StorageType.Session);
    }
}
