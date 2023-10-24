import {mock} from 'angular';

'use strict';

describe('Event Manager', function() {

  beforeEach(mock.module('moonbeamModule'));
  var eventManager;

  beforeEach(inject(function(_eventManager_) {
    eventManager = _eventManager_;
  }));

  describe('event manager', function() {

    it("publishes an event", function() {
      var subscribed = false, event = 'string';
      eventManager.subscribe(event, function() {
        subscribed = true;
      });
      eventManager.publish(event, 'string check');
      expect(subscribed).toEqual(true);
    });

    it("unsubscribes to an event", function() {
      var event = 'string', subscribed = false;
      var token = eventManager.subscribe(event, function() {
        subscribed = true;
      });
      eventManager.unSubscribe(event, token);
      eventManager.publish(event, 'string check');
      expect(subscribed).toEqual(false);
    });

    it("publishes an event that is not in eventActions", function() {
      eventManager.publish({}, 'string check');
      expect(eventManager._eventActions['string check']).toBeUndefined();
    });

    it("unsubscribes an event that is not in eventActions", function() {
      eventManager.unSubscribe('string check', {});
      expect(eventManager._eventActions['string check']).toBeUndefined();
    });
  })
});
