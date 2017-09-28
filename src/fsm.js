class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.fsm = [null, this.config.initial];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.fsm[this.fsm.length - 1];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
            if (this.config.states.hasOwnProperty(state))
                this.fsm.push(state);
            else
                throw new TypeError();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var flag = false;
        if (Object.keys(this.config.states[this.fsm[this.fsm.length - 1]].transitions).includes(event)){
            this.fsm.push(this.config.states[this.fsm[this.fsm.length - 1]].transitions[event]);
            flag = true;
        }
        if (!flag)
            throw new TypeError();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.fsm.push(this.config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (arguments.length === 0)
            return Object.keys(this.config.states);
        var arr = [];
        for (var st in this.config.states)
            if (Object.keys(this.config.states[st].transitions).includes(event))
                arr.push(st);
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.fsm[this.fsm.length - 2] === null)
            return false;
        this.fsm.unshift(this.fsm[this.fsm.length - 1]);
        this.fsm.splice(this.fsm.length - 1, 1);
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.fsm[0] === null)
            return false;
        this.fsm.push(this.fsm[0]);
        this.fsm.splice(0, 1);
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.fsm = [null, this.config.initial];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/




