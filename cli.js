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

cli.js:
    Includes a help menu by typing: node cli.js --help
    Includes a search command to search based on your selected API using a keyword
        Command Structure: node cli.js search <keyword>
        Options: -c, --cache: Return cached results when available (default: false)

    Includes a history command to get history on previous searches.
        Command Structure: node cli.js history
        No additional arguments or options
*/

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';