from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
from test import test
import requests
from cohere_api import cohere
import cohere_api


x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
CORS(app)


@app.route('/yelp', methods=['GET'])
def yelp_api():
    location = request.args.get('location')
    url = f"https://api.yelp.com/v3/businesses/search?location={location}&sort_by=best_match&limit=20"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer -qzIgLWa-gy3cnbiXjFLDRG86NebZoUmchyEA_SjVeS4AUqOS6R3YOCU1U5BCbrPaT3CWTEcmvycEA5nyHr9472XweTn4JzPlxRgC2vDfMbKglfntXcJrKsoi01EZHYx"
    }
    response = requests.get(url, headers=headers)
    return jsonify(response.json())


# Route for seeing a data
@app.route('/data', methods=["GET"])
def get_time():
    text = cohere_api.generate_text("Based on the following parameters, recommend me 10 places for vacation in a list format with no description. I like: beaches, sunny, and nature")
    # Returning an api for showing in  reactjs
    return {
        "Response" :  text
    }


# app.route gets called from API Service in frontend component
# test is an outside function inside journify'd backend folder, can be anything
# run server.py first then npm.start in frontend terminal
@app.route("/add", methods=["POST"], strict_slashes=False)
def add_articles():
    title = request.json['title']
    body = request.json['body']
    print("HERE")

    return jsonify({"title": "penis", "body": "asshol"})


# Running app
if __name__ == '__main__':
    app.run(debug=True)
