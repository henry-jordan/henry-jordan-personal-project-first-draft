from openai import OpenAI
from dotenv import load_dotenv
import certifi
import os

def configure():

    load_dotenv()

configure()

client = OpenAI(api_key = os.getenv('api_key'))

def get_response(conversation):

    print('Getting OpenAI API response')

    try:

        completion = client.chat.completions.create(

            model="gpt-3.5-turbo",

            messages = conversation

        )

        print(f'Completion: ${completion}')
        
        return completion.choices[0].message.content
    
    except Exception as e:

        print(f'Error in getting OpenAI API response: ${e}')

        return f'Error: ${str(e)}'