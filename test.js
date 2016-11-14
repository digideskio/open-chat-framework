"use strict";
const assert = require('chai').assert;

var typingIndicator = require('./plugins/typingIndicator.js');
var append1 = require('./plugins/append1.js');
var append2 = require('./plugins/append2.js');
var append3 = require('./plugins/append3.js');

var OCF = require('./src/index.js'); 

describe('import', function() {

    it('ocf should be imported', function() {
        assert.isObject(OCF, 'was successfully created');
    });

});

describe('conifg', function() {

    it('should be configured', function() {

        OCF.config({
            globalChannel: new Date()
        }, [
            typingIndicator({
                timeout: 2000
            })
        ]);

        assert.isOk(OCF);

    });

});

describe('identify', function() {

    it('should be identified as new user', function() {

        var me = OCF.identify('robot-tester', {works: true});
        assert.isObject(me);

    });

});

var chat;

describe('chat', function() {

    it('should be created', function() {

        chat = new OCF.GroupChat(new Date());

    });

    it('should get ready callback', function(done) {
        
        chat.emitter.on('ready', () => {

            done();

            chat.publish('message', {
                text: 'hello world'
            });

        });

    });

    it('should get message', function(done) {

        chat.emitter.on('message', (payload) => {

            assert.isObject(payload);
            done();

        });


    });

});
