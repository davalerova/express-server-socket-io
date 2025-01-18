const { io } = require('../index'); // Se importa io de index.js

const Bands = require('../models/bands');
const Band = require('../models/band');


const bands = new Bands();

bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Epica'));
bands.addBand(new Band('Pearl Jam'));
bands.addBand(new Band('Red Hot Chili Peppers'));

console.log(bands.getBands());



io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands());
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('vote-by-band', (payload) => {
        console.log('Voto recibido:', payload);
        bands.voteByBand(payload.id);
        io.emit('active-bands', bands.getBands());
        console.log(bands.getBands());
    });

    client.on('add-band', (payload) => {
        console.log('Banda recibida:', payload);
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
        console.log(bands.getBands());
    });

    client.on('delete-band', (payload) => {
        console.log('Banda eliminada:', payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
        console.log(bands.getBands());
    });
  });