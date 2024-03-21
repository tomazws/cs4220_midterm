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

db.js:
    The exact db.js file from cards-cli-app-completed (Week 09)
*/

import fs from 'fs';
import path from 'path';
import url from 'url';

// in ECMAScript Modules (ESM), __dirname is not available directly like in CommonJS
// use 'url' and 'path' modules to achieve similar functionality
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// define the path to the mock database directory
const dbDirectory = path.resolve(__dirname, 'mock_database');

/**
 * Reads and parses JSON data from a file
 * @param {string} collection - the name of the collection file
 * @returns {Promise<Array|Object>} the parsed JSON data from the collection
 * @throws {Error} an error if there's an issue reading or parsing the data
 */
const _read = async (collection) => {
    try {
        const fullPath = path.resolve(dbDirectory, `${collection}.json`);
        const data = await fs.promises.readFile(fullPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(
            `Error reading data from collection ${collection}: ${error.message}`
        );
    }
};

/**
 * Creates a new entry in a collection
 * @param {string} collection - the name of the collection file
 * @param {Object} data - the data to be added to the collection
 * @returns {Promise<void>} a Promise that resolves when the operation is complete
 * @throws {Error} an error if there's an issue creating the record
 */
export const create = async (collection, data) => {
    try {
        const records = await _read(collection);
        // console.log('//---- records ----//');
        // console.log(records);
        // console.log('//---- records ----//');
        records.push(data);
        // console.log('//---- data ----//');
        // console.log(data);
        // console.log('//---- data ----//');

        const fullPath = path.resolve(dbDirectory, `${collection}.json`);
        await fs.promises.writeFile(fullPath, JSON.stringify(records));
    } catch (error) {
        throw new Error(
            `Error creating record in collection ${collection}: ${error.message}`
        );
    }
};

/**
 * Finds all records or a record by ID in a collection
 * @param {string} collection - the name of the collection file
 * @param {string|null} id - the id of the record to find. if null, all records will be returned
 * @returns {Promise<Array|Object|null>} the record(s) found in the collection
 * @throws {Error} an error if there's an issue finding the record(s)
 */
export const find = async (collection, id = null) => {
    try {
        const records = await _read(collection);

        if (id) {
            const record = records.find((record) => record.id === id);
            return record;
        } else {
            return records;
        }
    } catch (error) {
        throw new Error(
            `Error finding record in collection ${collection}: ${error.message}`
        );
    }
};