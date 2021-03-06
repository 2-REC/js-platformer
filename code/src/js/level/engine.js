/**
 * ENGINE CLASS
 *  Implements the game loop.
 */

const Engine = function(time_step, update_fct, render_fct) {

    this.update = update_fct;
    this.render = render_fct;

    this.time_step = time_step;
    this.time_delta = 0;
    this.time = undefined;

    this.updated = false;
    this.animation_frame_request = undefined;


    this.loop = function(time) {

        this.animation_frame_request = window.requestAnimationFrame(this.handleLoop);

        this.time_delta += (time - this.time);
        this.time = time;

// TODO: use? why 3?
        /* Don't allow three full frames to pass without an update.
                This is not ideal, but at least the user won't crash their cpu. */
        if (this.time_delta >= this.time_step * 3) {
            this.time_delta = this.time_step;
        }

        while (this.time_delta >= this.time_step) {
            this.time_delta -= this.time_step;
            this.update(time);
            this.updated = true;
        }

        if (this.updated) {
            this.updated = false;
            this.render(time);
        }

    };


    this.handleLoop = (time_step) => { this.loop(time_step); };

};

Engine.prototype = {

    constructor: Engine,

    start: function() {
        this.time_delta = this.time_step;
        this.time = window.performance.now();
        this.animation_frame_request = window.requestAnimationFrame(this.handleLoop);
    },

    stop: function() {
        window.cancelAnimationFrame(this.animation_frame_request);
    }
};
