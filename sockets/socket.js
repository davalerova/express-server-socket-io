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

    client.on('mensaje', data => {
        console.log('Mensaje recibido:', data);
        io.emit('mensaje', {"nuevo_mensaje": data});
    });

    client.on('emitir-mensaje', (payload) => {
        console.log('Emitiendo mensaje:', payload);
        client.broadcast.emit('nuevo-mensaje', payload);
    });
  });