from re import L
from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
from test import test
import requests
from cohere_api import cohere
import cohere_api
from dotenv import load_dotenv
import os

load_dotenv()


x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
CORS(app)


@app.route('/yelp', methods=['GET'])
def yelp_api():
    location = request.args.get('location')
    #url = f"https://api.yelp.com/v3/businesses/search?location={location}&sort_by=best_match&limit=5"
    url = f"https://api.yelp.com/v3/businesses/search?location={location}&categories=museums,cafes,parks&sort_by=best_match&limit=16"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer -qzIgLWa-gy3cnbiXjFLDRG86NebZoUmchyEA_SjVeS4AUqOS6R3YOCU1U5BCbrPaT3CWTEcmvycEA5nyHr9472XweTn4JzPlxRgC2vDfMbKglfntXcJrKsoi01EZHYx"
    }
    response = requests.get(url, headers=headers)
    return jsonify(response.json())

@app.route('/data', methods=["POST"])
def find_location():
    data = request.get_json()
    location = data['location'] # assuming the JSON payload has a 'location' field
    print(location)
    text = cohere_api.generate_text(f"Give me a list of 10 vacation locations in the format 'city, country' based on these parameters: {location}. Do not number the list. Only give me the locations.")
    places_array = text.split('\n')
    places_array = list(filter(None, places_array))

    # holds the final object created from combining all related to location
    # holds locations without duplicate entries
    new_places_array = []
    
    for place in places_array:
        if place not in new_places_array:
            new_places_array.append(place)

    location_photo_links_array = []

    for places in new_places_array:
        photo_link_of_location = get_photos_from_google_places_api((places))
        location_photo_links_array.append(photo_link_of_location)

    locations_object = []

    for index, location in enumerate(new_places_array):
        locations_object.append({"location": location, "image": location_photo_links_array[index]})

    # Returning an api for showing in reactjs
    # return {"response": places_array}
    return {"response": locations_object}

def get_photos_from_google_places_api(location):
    if(location.find(" ") != -1):
        location = location.replace(" ", "%20")

    # print(location)
    location = location + "%20city"
    print(location)
    google_api_key = os.getenv("GOOGLE_MAPS_API_KEY")

    url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + location + "&key=" + google_api_key

    response = requests.get(url, timeout=60)

    # print(response.status_code)

    if(response.status_code == 200) :
        result = response.json()
        
        print(result)
        location_photo_reference_id = result['results'][0]['photos'][0]['photo_reference']
        # print(location_photo_reference_id)

        place_photo_request_url = "https://maps.googleapis.com/maps/api/place/photo?photo_reference=" + location_photo_reference_id + "&maxwidth=1280&key=" + google_api_key

        

        # print(place_photo_request_url)
        photo_response = requests.get(place_photo_request_url,timeout=60)
        photo_response_url = photo_response.url

        # print(photo_response.url)

        return photo_response_url
    else :
        result = {'error': "Failed to receive search response"}

@app.route('/itinerary', methods=["POST"])
def create_itinerary():
    data = request.get_json()
    print(data)
    activities = data['activities'] # assuming the JSON payload has a 'location' field
    location = data['location']
    days = data['days']
    text = cohere_api.generate_text(f"Write me a detailed itinerary with time stamps and a long description for each activity if I want to spend exactly {days} days in {location} doing {activities}. I want this itinerary to be divided up into respective days and to be as detailed as possible")
    # Returning an api for showing in reactjs
    print(text)
    return {"response": text}

# Running app
if __name__ == '__main__':
    app.run(debug=True)