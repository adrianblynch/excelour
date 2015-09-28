# Excelour

A Hapi based API for generating Excel documents.

This is a project to aid the teaching of Node and Hapi to colleagues.

## Notes

- It has been "tested" on Node 4.x.x
- It is far from best practice
- I may have introduced a security hole by allowing the user to inject into a response header
- Files are currently saved to disk
- Files are removed in a crude setTimeout - Should be done in a tail event or better still, streamed and not saved to disk
- I started using Frisby.js for testing the API but the lack of set-up and tear-down proved troublesome. Switched to Lab

## Usage

```
npm install

node index.js
```

## Testing

```
npm test
```
