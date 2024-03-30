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

api.js:
    Exports a function for searching the selected API by keyword and returns the response
    Exports a function for getting details from the selected API by a unique identifier and returns the response
*/

import axios from 'axios';

const baseURL = 'https://amiiboapi.com/api/amiibo/';

export const searchByKeyword = async (keyword) => {
    try {
        /*	We will need to decide which area to search. There are 5 areas we could search, pick ONE:
        	- Name:			    https://amiiboapi.com/api/amiibo/?name=value
        	- Type:			    https://amiiboapi.com/api/amiibo/?type=value
        	- Game Series:		https://amiiboapi.com/api/amiibo/?gameseries=value
        	- Amiibo Series:	https://amiiboapi.com/api/amiibo/?amiiboSeries=value
        	- Character		    https://amiiboapi.com/api/amiibo/?character=value
        */
        const response = await axios.get(`${baseURL}?character=${keyword}`);
        return response.data;
    } catch (error) {
        return error;
    }
};