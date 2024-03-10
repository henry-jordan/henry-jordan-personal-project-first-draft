export async function get_response(input) {

    try {

        const response = await fetch('/get_default_completion', {

            method: 'POST',
            headers: {

                'Content-Type': 'application/json',

            },

            body: JSON.stringify({ conversation: input }),

        });

        if (!response.ok) {

            throw new Error(`Error: ${response.statusText}`);

        }

        const data = await response.json();
        return data.response;

    } catch (error) {

        console.error(`Error in get_response (get_response.js): ${error}`);
        return ':response-failed:';

    };

};