// Grey button with borders
interface IButtonBase {
  label: string;
  action: string | Function;
  type?: string;
  icon?: string;
  disabled?: boolean;
  hidden?: boolean;
  opSelector?: string;
}

// Yellow button with borders
interface IButtonPrimary extends IButtonBase {
  primary: boolean;
}

// Transparent button without borders
interface IButtonTransparent extends IButtonBase {
  transparent: boolean;
}
export type IButton = IButtonPrimary | IButtonTransparent | IButtonBase;
export type ButtonSet = Array<IButton>;

/**
 * This type should be used as typed Angular SimpleChange object
 */
export type ComponentChange<T, P extends keyof T> = {
  previousValue: T[P];
  currentValue: T[P];
  firstChange: boolean;
};

/**
 * This type should be used as typed Angular SimpleChanges object
 */
export type ComponentChanges<T> = {
  [P in keyof T]?: ComponentChange<T, P>;
};

export enum EAssignmentType {
  audit = 'audit',
  webJourney = 'webJourney',
  liveConnect = 'liveConnect'
}

export enum ESelectorMatchType {
  string = 'String',
  urlParam = 'UrlParameter',
  dataLayerVariable = 'DataLayer',
  tagVariable = 'Tag',
  empty = 'Empty'
}

export enum EDatasourceTagSelectionType {
  AllTagsPresence = 'allTagsPresence',
  Tag = 'tag'
}

export interface IDatasourceTag {
  itemType: EAssignmentType;
  itemId: number;
  runId: number;
  tagSelectionType: EDatasourceTagSelectionType.Tag;
  tagId: number;
  selectedVariables: string[];
}
