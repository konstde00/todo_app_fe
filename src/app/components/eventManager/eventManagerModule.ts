import {Names} from '../../constants';

import * as angular from 'angular';
import {EventManager} from './eventManager';

export default angular.module('eventManager', [])
  .service(Names.Services.eventManager, EventManager)
  .name
