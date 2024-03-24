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

/*
Proposed rundown:
1. User running the app by executing:
	node cli.js search <keryword>
		Make sure we include the option to return cached results when available
			Ex: node cli.js search mario
	Make sure we include --help in cli.js
	node cli.js history to display a history of all previous searches

2. Perform search keyword with API, and record keyword into search_history.json
	We will need to decide which area to search. There are 5 areas we could search, pick ONE:
        	- Name:			    Use /api/amiibo/?name=value
        	- Type:			    Use /api/amiibo/?type=value
        	- Game Series:		Use /api/amiibo/?gameseries=value
        	- Amiibo Series:	Use /api/amiibo/?amiiboSeries=value
        	- Character		    Use /api/amiibo/?character=value

3. Display SORTED search results and prompt user to select ONE
	Ex:
		[ ] Baby Mario
		[ ] Mario
		[ ] Metal Mario
		etc...

4. If !cache:
    - Get item by ID from API:                      Use /api/amiibo/?id=value
    - Save entry in search_cache.json
    Else if cache:
    - Attempt to find item in search_cache.json
        - If not found, get item by ID from API:    Use /api/amiibo/?id=value
            - Save entry in search_cache.json

5. Display detailed data
*/

// helper functions for printing
const _printConsole = (data) => {
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