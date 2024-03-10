export class user_message {

    constructor(value, id) {

        this.value = value.trim();
        this.id = id;
        this.sender = 'user';

    };

    generate_html() {

        return `
        <div class="user-message-container" id="user-message-${this.id}">
            <div class="user-message">
                <p class="message-text">${this.value}</p>
            </div>
            <div class="user-message-options">
                <button class="edit-message-button"><svg xmlns="http://www.w3.org/2000/svg" height="12px" width="12px" viewBox="0 0 512 512"><style>svg{fill:#fdfdfd}</style><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg></button>
            </div>
        </div>`;

    };

    activate_message() {

        this.element = document.querySelector(`#user-message-${this.id}`);
        this.buttons = {

            edit : this.element.querySelector('.edit-message-button'),

        };

        this.activate_buttons();

    };

    activate_buttons() {

        this.buttons.edit.onclick = () => {this.edit_message()};

    };

    edit_message() {

        
        this.buttons.edit.disabled = true;
        
        const edit_options = document.querySelector(`.message-edit-options`);
        const text_element = this.element.querySelector('.message-text');
        const initial_value = text_element.innerText;
        
        edit_options.classList.toggle('show');

        document.querySelector('#chat-input').disabled = true;
        document.querySelector('#chat-submit').disabled = true;

        text_element.contentEditable = true;
        text_element.focus();

        const range = document.createRange();
        range.selectNodeContents(text_element);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        edit_options.querySelector('.message-edit-confirm').onclick = () => {this.edit_message_confirm()};
        edit_options.querySelector('.message-edit-cancel').onclick = () => {this.edit_message_cancel(initial_value)};

    };

    edit_message_confirm() {

        this.value = this.element.querySelector('.message-text').innerText;

        this.edit_message_cancel();

    };

    edit_message_cancel(initial_value) {

        
        this.buttons.edit.disabled = false;
        
        const edit_options = document.querySelector(`.message-edit-options`);
        const text_element = this.element.querySelector('.message-text');
        
        if (initial_value) {

            text_element.innerText = initial_value;

        };

        edit_options.classList.toggle('show');
        
        document.querySelector('#chat-input').disabled = false;
        document.querySelector('#chat-submit').disabled = false;

        text_element.contentEditable = false;
        
        edit_options.querySelector('.message-edit-confirm').removeEventListener('onclick', this.edit_message_confirm);
        edit_options.querySelector('.message-edit-cancel').removeEventListener('onclick', this.edit_message_cancel);

    };

};

export class response_message {

    constructor(value, id) {

        this.value = value;
        this.id = id;
        this.sender = 'assistant';

    };

    generate_html() {

        return `
        <div class="engine-message-container" id="engine-message-${this.id}">
            <div class="engine-message">
                <p class="message-text">${this.value}</p>
                </div>
            <div class="engine-message-options">
                <button class="regenerate-message-button"><svg xmlns="http://www.w3.org/2000/svg" height="12px" width="12px" viewBox="0 0 512 512"><style>svg{fill:#fdfdfd}</style><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg></button>
            </div>
        </div>`;

    };

    activate_message() {

        this.element = document.querySelector(`#engine-message-${this.id}`);
        this.buttons = {

            regenerate : this.element.querySelector('.regenerate-message-button'),

        };

        this.activate_buttons();

    };

    activate_buttons() {

        this.buttons.regenerate.onclick = () => {this.regenerate_message()};

    };

    regenerate_message() {

        console.log('Test: Regenerating message.');

    };

};

export class awaiting_response {

    constructor() {

        this.value = ':awaiting:';
        this.id = ':awaiting:';

    };

    generate_html() {

        return `
        <div class="awaiting-response-message">
            <p class="awaiting-response-text">
                <div class="dot-flashing"></div>
            </p>
        </div>`;

    };

    activate_message() {};

};