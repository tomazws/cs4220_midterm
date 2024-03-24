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

import { checkbox } from '@inquirer/prompts';
import * as api from './api.js';
import * as db from './db.js';

const _printConsole = (some_shit) => {
    console.log('I print shit so fucking beautiful');
};

const _selectionPrompt = async (characters) => {
    const displayCharacters = characters.map((character) => {
        return { name: character.name_or_some_shit, id: character.id };
    });

    return await checkbox({// Is there a radio button version? Instead of using checkbox????????
        message: 'Select a character',
        choices: displayCharacters,
        validate: (characters) => {
            if (characters.length > 1) {
                return 'Your may only select 1 character';
            } else {
                return true;
            }
        }
    });
};

export const searchAmiibo = async (args) => {
    try {
        // good luck
    } catch (error) {
        console.error(error);
    }
};

export const history = async () => {
    // good luck
};