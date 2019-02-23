/**
 * DISPLAY CLASS
 */

const Display = function(canvas) {

    this.buffer  = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");

    //// BEGIN
    this.drawPlayer = function(x, y, width, height, color) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    };

    this.drawLevel = function(color) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    };
    //// END

    this.render = function() {
        this.context.drawImage(this.buffer.canvas,
            0, 0, this.buffer.canvas.width, this.buffer.canvas.height,
            0, 0, this.context.canvas.width, this.context.canvas.height);
    };

    this.resize = function(width, height, height_width_ratio) {
        if ((height / width) > height_width_ratio) {
            this.context.canvas.height = width * height_width_ratio;
            this.context.canvas.width = width;
        }
        else {
            this.context.canvas.height = height;
            this.context.canvas.width = height / height_width_ratio;
        }

        this.context.imageSmoothingEnabled = false;
    };

};

// TODO: necessary?
Display.prototype.constructor = Display;
