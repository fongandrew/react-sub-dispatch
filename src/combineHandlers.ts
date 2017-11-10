import * as T from './types';

/*
  Combine handlers based on action types
*/
export default function combineHandlers<ActionsMap, Services, Ret = any>(
  ...additions: T.HandlerAdditionsMap<ActionsMap, Services, Ret>[]
): T.GenericHandler<ActionsMap, Services, Ret[]> {
  const handlersByType: T.HandlerListMap<ActionsMap, Services, Ret> = {};

  // Iterate through each map and each action type within that map
  additions.forEach(additionsMap => {
    Object.keys(additionsMap).map(
      <Type extends keyof ActionsMap>(type: Type) => {
        // Init list if doesn't exist
        const handlers = handlersByType[type] = handlersByType[type] || [];

        // Can add either single handler or list
        const newHandlers = additionsMap[type];
        if (newHandlers instanceof Array) {
          for (let handler of newHandlers) {
            handlers.push(handler);
          }
        } else if (newHandlers) {
          handlers.push(newHandlers);
        }
      }
    );
  });

  // Return handler that processes subhandlers sequentially, returns
  // array of results.
  return (action, services) => {
    const handlers = handlersByType[action.type] || [];
    return handlers.map(h => h(action, services));
  };
}