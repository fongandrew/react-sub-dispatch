import * as T from './types';

/*
  Create an action dispatcher -- similar to Redux in design but decoupled
  from datastore.

  Most of the work here is done in the handler. Unlike Redux, no real need
  for middleware or enhancers.
*/
export default function createDispatcher<ActionsMap, Services, Ret = any>(
  handler: T.GenericHandler<ActionsMap, Services, Ret>,
  services: Services
): T.Dispatcher<ActionsMap, Services, Ret> {
  const dispatcher: T.Dispatcher<ActionsMap, Services, Ret> = {
    services,

    // Reference dispatcher.services rather than services directly so
    // services can be stubbed out.
    dispatch: (action) => handler(action, dispatcher.services)
  };

  return dispatcher;
}
