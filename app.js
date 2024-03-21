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