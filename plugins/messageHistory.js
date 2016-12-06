"use strict";

const defaults = {timeout: 1000};

let messageHistory = (config) => {

    // let log = [];

    let extension = {
        construct: function(data) {

            this.log = [];

            this.parent.room.history((response) => {

                for(let i in response) {

                    this.log.push(response[i].data.message);

                    this.parent.emit(
                        ['history', response[i].data.message[0]].join(':'), 
                        response[i].data.message[1]);

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
