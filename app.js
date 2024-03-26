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

//helper function for printing
const _printConsole = (amiibo) => {
    console.log('----------------------');
    amiibo.forEach(element => {
        console.log(element.name + " [" + element.gameSeries +"] (NA " + (element.release['na'] == null ? "not released" :element.release['na'].substring(0,4)) + ")"
         + " (JP " + (element.release['jp'] == null ? "not released" :element.release['jp'].substring(0,4)) + ")")
         console.log('----------------------');
    });
    
}



const _selectionPrompt = async (amiibos) => {
    const displayCharacters = amiibos.map((character) => {
        return { name: `${character.name} ( ${character.gameSeries} )
         (NA) ${character.release['na'] == null ? "not released" :character.release['na'].substring(0,4)},
         (JP) ${character.release['jp'] == null ? "not released" :character.release['jp'].substring(0,4)}`,
         value: character.head + character.tail};
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

const _findAndRemove = (original, throwaway) => {
    return original.filter((character) => {
        return throwaway.includes(character.head + character.tail);
    });
};

export const searchAmiibo = async (args) => {
    try {
        const amiibos = await api.searchByKeyword(args.keyword);
        const throwaway = await _selectionPrompt(amiibos.amiibo);
        const filtered = _findAndRemove(amiibos.amiibo,throwaway);
        _printConsole(filtered);
    } catch (error) {
        console.error(error);
    }
};

export const history = async () => {
    // good luck
};