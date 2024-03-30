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
    amiibo.forEach(element => {
        console.log(`Character: ${element.name}`);
        console.log(`Game Series: ${element.gameSeries}`);
        console.log("Release: (NA " + (element.release['na'] == null ? "not released" :element.release['na'].substring(0,4)) + ")"
         + " (JP " + (element.release['jp'] == null ? "not released" :element.release['jp'].substring(0,4)) + ")");
        console.log(`Image: ${element.image}`);
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

    return await select({
        message: 'Select a character',
        choices: displayCharacters
    });
};

const _findAndRemove = (original, throwaway) => {
    return original.filter((character) => {
        return throwaway.includes(character.head + character.tail);
    });
};

export const searchAmiibo = async (args) => {
    try {
        // Search the API by keyword
        const amiibos = await api.searchByKeyword(args.keyword);
        // Prompt user to select an item from the search results
        const throwaway = await _selectionPrompt(amiibos.amiibo);
        const filtered = _findAndRemove(amiibos.amiibo,throwaway);
        filtered[0].id = filtered[0].head + filtered[0].tail;
        //Save the keyword and the amount of results in search_history.json
        await db.create('search_history', {search: args.keyword, resultCount: amiibos.amiibo.length});

        const cacheCheck = await db.find("search_cache");
        let savedCache = args.cache;

        if (!savedCache) {
            _printConsole(filtered);
            await db.create("search_cache", filtered);
            console.log("Not Cache");
        }
        if (savedCache) {
            let cacheFound = false;
            for (let cache of cacheCheck) {
                if (cache[0].id == filtered[0].id) {
                    _printConsole(cache);
                    console.log("Pull from cache");
                    cacheFound = true;
                    break;
                }
            }
            if (!cacheFound) {
                _printConsole(filtered);
                await db.create("search_cache", filtered);
                console.log("Cache not found, added to cache");
            }
        }

    } catch (error) {
        console.error(error);
    }
};

export const history = async () => {
    try {
        const searchHistory = await db.find('search_history');
        console.log("Search History:\n-------------");
        searchHistory.forEach((result) => {
            console.log(result.search + " | " + result.resultCount);
        });
    } catch (error) {
        console.error("Error reading search history:", error);
    }
};
