export class Names {
  static module = 'moonbeamModule';

  static Services = class {
    static eventManager = 'eventManager';
  };

  static GlobalStateKeys = class {
    static authorization = 'authorization';
    static authorizationId = 'authorizationId';
    static originalOptionalFeatures = 'originalOptionalFeatures';
    static originalState = 'originalState';
    static orignalAuthorization = 'originalAuthorization';
  };

  static NgServices = class {
    static switchAccount = 'switchAccountService';
  };
}

export class AngularNames {
  static ngRedux = '$ngRedux';
  static q = '$q';
}

export class Events {
  static featureChanged = 'featureChanged';
}

export class VariableStatus {
  static value = 'Value';
}

export class Features {
  static analytics = 'analytics';

  static values = [
    {
      name: Features.analytics,
      displayName: 'Analytics'
    }
  ];
}

export class HttpStatuses {
  static ok = 200;
  static noContent = 204;
  static multipleChoices = 300;
  static unauthorized = 401;
  static forbidden = 403;
  static authTimeout = 419;
  static loginTimeout = 419;
  static locked = 423;
  static internalServerError = 500;
}
