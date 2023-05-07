import { ActionReducer, MetaReducer, Action } from '@ngrx/store';

/**
 * A meta reducer that logs the previous state, action, and next state to the console.
 * Meta reducers are higher-order reducers that intercept and modify actions and state
 * before they reach the regular reducers. They can be used for logging, state persistence,
 * or other state manipulations that are not directly related to specific actions.
 *
 * @template State - The type of the state object in the store.
 * @param {ActionReducer<State, Action>} reducer - The original reducer function.
 * @returns {ActionReducer<State, Action>} - A new reducer function that wraps the original reducer and logs the state and action.
 */
export function loggingMetaReducer<State>(
  reducer: ActionReducer<State, Action>
): ActionReducer<State, Action> {
  return (state: State | undefined, action: Action): State => {
    const nextState = reducer(state, action);

    console.groupCollapsed('Logging Meta Reducer');
    console.log('Previous state:', state);
    console.log('Action:', action);
    console.log('Next state:', nextState);
    console.groupEnd();

    return nextState;
  };
}
