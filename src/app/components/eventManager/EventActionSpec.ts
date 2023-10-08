import {mock} from 'angular';
import {EventAction} from "@app/components/eventManager/EventAction";

'use strict';

describe('Event Action', function() {

  var eventAction;

  beforeEach(mock.module('eventManagerModule'));

  beforeEach(function() {
    eventAction = new EventAction();
  });

  it('creates a new subscription and id', function() {
    var callback = function() {
      return 1;
    };
    var subscriptionId = eventAction.subscribe(callback);
    expect(subscriptionId).toEqual(0);
    subscriptionId = eventAction.subscribe(callback);
    expect(subscriptionId).toEqual(1);
  });

});
