const { addNoteHandler, getAllNotesHandler, getNotesByIdHandler, editNoteHandler, deleteNoteByIdHandler } = require("./handler");

const route = [
    {
        method : 'POST',
        path : '/notes',
        handler : addNoteHandler
    },
    {
        method : 'GET',
        path : '/notes',
        handler : getAllNotesHandler
    },
    {
        method : 'GET',
        path : '/notes/{id}',
        handler : getNotesByIdHandler
    },
    {
        method : 'PUT',
        path : '/notes/{id}',
        handler : editNoteHandler
    },
    {
        method : 'DELETE',
        path : '/notes/{id}',
        handler : deleteNoteByIdHandler
    }
];

module.exports = route;