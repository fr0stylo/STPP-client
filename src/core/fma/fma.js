import { Machine } from 'xstate';

export default class Automata {
  constructor(props, INIT_CONTEXT) {
    this.machine = Machine({ ...props }, {}, { ...INIT_CONTEXT });
    this.currentState = this.machine.initial;
  }

    transition = (SIGNAL) => {
      const transition = this.machine.transition(this.currentState, SIGNAL);
      // console.log(transition);
      transition.actions.forEach(action => action());
      this.currentState = transition.value;

      return transition.value;
    };

    getCurrentState = () => this.currentState;
}
