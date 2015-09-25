# Excelour

A Hapi based API for generating Excel documents.

This is a project to aid the teaching of Node and Hapi to colleagues.

## Notes

- It has been "tested" on Node 4.x.x
- It is far from best practice
    - The queue is saved to disk ~~in memory~~
    - I use sync methods to ease coding
    - Both the API, polling code and excel generation is all bundled together
    - I may have introduced a security hole by allowing the user to inject into a response header
    - I don't clean up the files
- I started using Frisby.js for testing the API but the lack of set-up and tear-down proved troublesome. Switched to Lab
