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
    Brian Mojica

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
import { select as select } from '@inquirer/prompts';
import * as api from './api.js';
import * as db from './db.js';

// Helper function for printing
const _printConsole = (amiibo) => {
    console.log('----------------------');
    // ************************ MIDTERM FIXES ************************
    // Removed "foreach" because we're printing one character.
    // amiibo.forEach(element => {
    //     console.log(`Character: ${element.name}`);
    //     console.log(`Game Series: ${element.gameSeries}`);
    //     console.log("Release: (NA " + (element.release['na'] == null ? "not released" :element.release['na'].substring(0,4)) + ")"
    //      + " (JP " + (element.release['jp'] == null ? "not released" :element.release['jp'].substring(0,4)) + ")");
    //     console.log(`Image: ${element.image}`);
    //     console.log('----------------------');
    // });
    console.log(`Character:   ${amiibo.name}`);
    console.log(`Game Series: ${amiibo.gameSeries}`);
    console.log("NA Release:  " + (amiibo.release['na'] == null ? "Not released" :amiibo.release['na'].substring(0,4)));
    console.log("JP Release:  " + (amiibo.release['jp'] == null ? "Not released" :amiibo.release['jp'].substring(0,4)));
    console.log(`Image:       ${amiibo.image}`);
    console.log('----------------------');

}

const _selectionPrompt = async (amiibos) => {
    const displayCharacters = amiibos.map((character, key) => {
        // ************************ MIDTERM FIXES ************************
        // Updated the following line for a cleaner selection output
        return { name: `${key + 1}) ${character.name} ( ${character.gameSeries} )`, value: character.head + character.tail};
    });

    return await select({
        message: 'Select a character',
        choices: displayCharacters
    });
};

// ************************ MIDTERM FIXES ************************
// We don't need this function. We are not removing anything.\
// We just get the ID that user selected and that's it.
// const _findAndRemove = (original, throwaway) => {
//     return original.filter((character) => {
//         return throwaway.includes(character.head + character.tail);
//     });
// };

// ************************ MIDTERM FIXES ************************
// A helper function to pull character details from the API and save it
// into the database if it doesn't exist in the database (no dubplicates)
const _getCharacterAndSave = async (id) => {
    // Get details of the character by ID
    const character = await api.getDetailsById(id);
    // Saves an entry if it doesn't exist in the database
    if (!(await db.find('search_cache', id))) {
        // Joining head and tail to create the ID field before recording into database
        character.id = character.head + character.tail;
        await db.create("search_cache", character);
    }

    return character;
};

export const searchAmiibo = async (args) => {
    try {
        // Search the API by keyword
        const amiibos = await api.searchByKeyword(args.keyword);

        // Save the keyword and the amount of results in search_history.json
        // ************************ MIDTERM FIXES ************************
        // Moved the following line to before the user selection.
        // This line deals with saving search history, nothing to do with user selection
        // Let's group this line closer to the search functionality above
        await db.create('search_history', {search: args.keyword, resultCount: amiibos.amiibo.length});

        // Prompt user to select an item from the search results
        // ************************ MIDTERM FIXES ************************
        // We don't need throwaway, throwaway is actually the ID we need because the user picked it.
        // Removed three lines and replaced with one line to get the ID from _selectionPrompt
        /*
        const throwaway = await _selectionPrompt(amiibos.amiibo);
        const filtered = _findAndRemove(amiibos.amiibo,throwaway);
        filtered[0].id = filtered[0].head + filtered[0].tail;
        */
        const id = await _selectionPrompt(amiibos.amiibo);

        // Retrieve detailed data for the selected item based on the cache option
        // ************************ MIDTERM FIXES ************************
        // Just going to rewrite this whole thing...
        /*
        if (!args.cache) {
            // It will be slower to call the API again, since filtered already has all the information
            _printConsole(filtered);

            // Save the selected item in search_cache.json
            await db.create("search_cache", filtered);
            console.log("Not Cache");
        }
        if (args.cache) {
            // Check if the selected item is in search_cache.json
            let cacheFound = false;
            
            // We are unable to utilize the find function with the search parameter
            // The db.js find function would need to be updated
            // so we pull the entire cache to loop through instead
            const cacheCheck = await db.find("search_cache");
            for (let cache of cacheCheck) {
                if (cache[0].id == filtered[0].id) {
                    _printConsole(cache);
                    console.log("Pull from cache");
                    cacheFound = true;
                    break;
                }
            }

            // If the selected item is not in search_cache.json,
            // get the selected item by unique identifier from the API
            // Same as above, since pulling from the API retrieves the same information
            // as filtered, we just print the information from filtered
            if (!cacheFound) {
                _printConsole(filtered);
                await db.create("search_cache", filtered);
                console.log("Cache not found, added to cache");
            }
        }
        */
        let character;

        if (!args.cache) {
            character = await _getCharacterAndSave(id);
            console.log("Character details pull from API");
        } else {
            character = await db.find('search_cache', id);
            if (!character) {
                character = await _getCharacterAndSave(id);
                console.log("Character not found in cache, details pull from API");
            } else {
                console.log("Character details pull from cache");
            }
        }

        _printConsole(character);

    } catch (error) {
        console.error(error);
    }
};

export const history = async () => {
    try {
        // Retrieve the search history from the mock database
        const searchHistory = await db.find('search_history');
        console.log("Search History:\n-------------");
        searchHistory.forEach((result) => {
            console.log(result.search + " | " + result.resultCount);
        });
    } catch (error) {
        console.error("Error reading search history:", error);
    }
};
