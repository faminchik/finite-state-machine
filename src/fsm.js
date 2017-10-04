class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.activeState = this.config.initial;
        this.undoArray = [];
        this.redoArray = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states.hasOwnProperty(state)) {
            this.undoArray.push(this.activeState);
            this.redoArray = [];
            this.activeState = state;
        } else {
            throw new TypeError();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let flag = false;
        if (Object.keys(this.config.states[this.activeState].transitions).includes(event)){
            this.undoArray.push(this.activeState);
            this.redoArray = [];
            this.activeState = this.config.states[this.activeState].transitions[event];
            flag = true;
        }
        if (!flag) {
            throw new TypeError();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.undoArray.push(this.activeState);
        this.activeState = this.config.initial;
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
        let arr = [];
        for (let state in this.config.states)
            if (Object.keys(this.config.states[state].transitions).includes(event))
                arr.push(state);
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.undoArray.length === 0) {
            return false;
        }
        this.redoArray.push(this.activeState);
        this.activeState = this.undoArray.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.redoArray.length === 0) {
            return false;
        }
        this.undoArray.push(this.activeState);
        this.activeState = this.redoArray.pop();
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoArray = [];
        this.redoArray = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
