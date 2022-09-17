const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
    //mengambil request dari body dengan menggunakan request.payload
    const {title,tags,body} = request.payload;

    //membuat random string sebanyak 16 karakter
    const id = nanoid(16);

    //toISOString untuk merubah tipe data date ke string
    const createdAt = new Date().toISOString();
    
    const updatedAt = createdAt;

    const newNote = {
        title,tags,body,id,createdAt,updatedAt
    };

    //menambahkan data ke array notes
    notes.push(newNote);

    
    const isSucces = notes.filter((note) => note.id === id).length > 0;
    if(isSucces){
        const response = h.response({
            status : 'success',
            message : 'Catatan berhasil ditambahkan',
            data : {
                noteId: id
            }
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
};

const getAllNotesHandler = () => ({
    status : 'succes',
    data : {
        notes
    }
});

const getNotesByIdHandler = (request,h) => {
    const {id} = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if(note !== undefined ){
        return {
            status : 'success',
            message : 'catatan ditemukan',
            data : {
                note
            }
        }
    }
    const response = h.response({
        status : 'failed',
        message : 'catatan tidak ditemukan'
    });
    response.code(404);
    return response;
};

const editNoteHandler = (request,h) => {
    const {id} = request.params;
    const {title,tags,body} = request.payload;

    const updatedAt = new Date().toISOString();

    //mencari index array pada object note berdasarkan id
    const index = notes.findIndex((n) => n.id === id);

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }

        const response = h.response({
            status : 'success',
            message : 'catatan berhasil diubah'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message : 'gagal merubah catatan'
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request,h) => {
    const {id} = request.params;

    const index = notes.findIndex((n) => n.id === id);

    if(index !== -1){
        notes.splice(index,1);
        const response = h.response({
            status : 'success',
            message : 'catatan berhasil terhapus'
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status : 'success',
        message : 'catatan gagal terhapus'
    });
    response.code(404);
    return response;
}

module.exports = {addNoteHandler,getAllNotesHandler,getNotesByIdHandler,editNoteHandler,deleteNoteByIdHandler};