"use strict";

const defaults = {timeout: 1000};

let remoteHistory = (config) => {

    config = config || {};
    config.autoRestore = config.autoRestore || true;

    let extension = {
        messages: [],
        construct: function() {
            
            if(config.autoRestore) {
                this.restore();   
            }

        },
        restore: function () {

            this.parent.room.history((messages) => {
                this.parent.messages = messages;
            });

        }
    }

    return {
        namespace: 'remoteHistory',
        extends: {
            Chat: extension,
            GroupChat: extension
        }
    }

}


if(typeof module !== "undefined") {
    module.exports = remoteHistory;
} else {
    window.OCF.plugin.remoteHistory = remoteHistory;
}
