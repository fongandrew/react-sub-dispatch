/*
  Common, shared types
*/

// Define Flux actions as a function of an ActionsMap -- a record mapping
// actions types to other properties of that action
export type Action<
  ActionsMap,
  Type extends keyof ActionsMap
> = ActionsMap[Type] & {
  type: Type;
};

// Handler processes a single action type with some services
export interface Handler<Action, Services, Ret> {
  (action: Action, services: Services): Ret;
}

// Generic version of the above, may handle multiple types, defined as
// function of ActionsMap.
export interface GenericHandler<
  ActionsMap,
  Services,
  Ret
> {
  <Type extends keyof ActionsMap>(
    action: Action<ActionsMap, Type>,
    services: Services
  ): Ret;
}

// Interface for list of active handlers
export type HandlerListMap<ActionsMap, Services, Ret> = {
  [Type in keyof ActionsMap]?: Handler<
    Action<ActionsMap, Type>,
    Services,
    Ret
  >[];
};

// Interface for adding handlers to Dispatcher
export type HandlerAdditionsMap<ActionsMap, Services, Ret> = {
  [Type in keyof ActionsMap]?: (
    Handler<Action<ActionsMap, Type>, Services, Ret>[]|
    Handler<Action<ActionsMap, Type>, Services, Ret>
  );
};

// Dispatch function
export interface DispatchFn<ActionsMap, Ret> {
  <Type extends keyof ActionsMap>(
    action: Action<ActionsMap, Type>
  ): Ret;
}

// Provides services to action dispatch
export interface Dispatcher<ActionsMap, Services, Ret> {

  // Call handlers on action
  dispatch: DispatchFn<ActionsMap, Ret>;

  // Services are public. Modifying the available services isn't necessarily
  // an advisable thing, but we make it public for ease of mocking, etc.
  services: Services;
}
