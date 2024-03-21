/*
CS4220 Midterm Project

API:
    AmiiboAPI

API Description:
    A RESTful API that contains the Amiibo Database that was created on the excel spreadsheet:
    https://docs.google.com/spreadsheets/d/19E7pMhKN6x583uB6bWVBeaTMyBPtEAC-Bk59Y6cfgxA/edit#gid=0

API documentations:
    https://amiiboapi.com/docs/

Authors:
    Thomas Yeung
    Isaac Mendoza
    Jason Schmidt
    Alberto Barboza
    Angel Penate

app.js:
    Exports function to handle the logic for when a user searches by keyword.
        Searches the selected API by keyword
        Saves data in the mock database
            Reference search_history.json
        Prompts the user to select an item from the search results.
        Retrieves detailed data for the selected item based on the cache option
            IF cache option false (default)
                Gets the selected item by unique identifier from the your API
                Saves an entry in search_cache.json
                    Reference: search_cache.json 
            IF cache option true
                Attempts to find the selected item in search_cache.json and return the item
                If not found in the search_cache.json - gets the selected item by unique identifier from the API
                Saves an entry in search_cache.json
                    Reference: search_cache.json
        Displays the detailed data to the user in a user-friendly format.
            NO Array/Object or JSON print outs.
    
    Exports a function to handle logic for displaying the search history
        Retrieves the search history from the mock database
        Displays the history to the user in a user-friendly format
            Reference search_history.json
*/

import * as api from './api.js';
import * as db from './db.js';


/*
Proposed rundown:

1. Prompts the user to select search options:
    - Search by:
        - Name
        - Type
        - Game Series
        - Amiibo Series
        - Character

2. User selects search option and enters keyword
3. Performs search based on selected option and keyword
    - If search by:
        - Name:                                     Use /api/amiibo/?name=value
        - Type:                                     Use /api/amiibo/?type=value
        - Game Series:                              Use /api/amiibo/?gameseries=value
        - Amiibo Series:                            Use /api/amiibo/?amiiboSeries=value
        - Character                                 Use /api/amiibo/?character=value
4. Gets response from API, prompts user to select ONE item from the search results
5. If !cache:
    - Get item by ID from API:                      Use /api/amiibo/?id=value
    - Save entry in search_cache.json
    Else if cache:
    - Attempt to find item in search_cache.json
        - If not found, get item by ID from API:    Use /api/amiibo/?id=value
            - Save entry in search_cache.json
6. Display detailed data all nice and shit.
7. Fucking done.
*/