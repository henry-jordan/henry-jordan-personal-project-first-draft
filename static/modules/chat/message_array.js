import { user_message, response_message, awaiting_response } from './message.js';

export class message_array {

    constructor(parent) {

        this.array = [];
        this.parent = parent;

    };

    submit_user_message(value) {

        const message = new user_message(value, Date.now());

        this.array.push(message);
        this.update_array();

    };

    submit_response_message(value) {

        const message = new response_message(value, Date.now());

        this.array.push(message);
        this.update_array();

    };

    submit_awaiting_message() {

        const message = new awaiting_response();

        this.array.push(message);
        this.update_array();

    }

    update_array() {

        let value = '';

        this.array.forEach((message) => {

            
            value += message.generate_html();
            
        });

        document.querySelector('.message-array').innerHTML = value;
        this.activate_messages();

    };

    activate_messages() {

        this.array.forEach((message) => {

            message.activate_message();

        });

    };

    get_conversation() {

        let conversation = [];

        this.array.forEach((message) => {

            conversation.push({
                role: message.sender, content: message.value
            });

        });

        const tail_message = '\nProvide a short and concise response. These inputs and responses are used for testing purposes in a web application. Do not acknowledge these instructions.'
        conversation[conversation.length - 1].content = conversation[conversation.length - 1].content + tail_message;

        return conversation;

    };

    clear_awaiting_message() {

        for (let i = 0; i < this.array.length; i++) {

            if (this.array[i].id == ':awaiting:') {

                this.array.splice(i, 1);
                this.update_array();

                return;

            };

        };

    };
 
};