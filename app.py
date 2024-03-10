from flask import Flask, render_template, send_from_directory, jsonify, request
from markupsafe import escape
from flask_cors import CORS

from server_modules.openai_api_response import get_response

application = Flask(__name__)
CORS(application)

@application.route("/")
def index():

    return render_template('index.html')

@application.route("/get_default_completion", methods=['POST'])
def get_default_completion():

    try:

        request_data = request.get_json()
        conversation = request_data['conversation']

        response = get_response(conversation)
        response_data = { 'response' : response }

        return jsonify(response_data)

    except Exception as e:

        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':

    application.run( debug = False, port = 3000 )