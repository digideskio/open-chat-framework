"use strict";

const util = require('util');


const defaults = {timeout: 1000};

let messageHistory = (config) => {

    // let log = [];

    let extension = {
        construct: function(data) {

            this.log = [];

            this.parent.room.history((response) => {

                console.log('calling history on', this.parent.room.channel, response);

                for(let i in response) {

                    this.log.push(response[i]);
                    console.log('emitting historymessage', response[i])

                    this.parent.emit('historymessage', response[i]);

                }

            });

        }
    };

    return {
        namespace: 'history',
        extends: {
            Chat: extension,
            GroupChat: extension
        }
    }

}


if(typeof module !== "undefined") {
    module.exports = messageHistory;
} else {
    window.OCF.plugin.messageHistory = messageHistory;
}
