const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const {crearMensaje } = require('../utils/utilidades')
const socketIO = require('socket.io');


const usuarios = new Usuarios();

io.on('connection', (client = new socketIO ) => {       

    client.on('entrarChat', (usuario, callback)=>{
        //console.log(usuario);
        if(!usuario.nombre || !usuario.sala){
            return callback({
                error: true,
                mensaje: 'El nombre/sala son necesarios'
            });
        }

        client.join(usuario.sala);

        usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);
        client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonaPorSala(usuario.sala))

        callback(usuarios.getPersonaPorSala(usuario.sala));        
    })

    client.on('crearMensaje', (data)=>{
        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });
    

    //mensajes privados            
    client.on('mensajePrivado', (data)=>{                
        let persona = usuarios.getPersona(client.id);        
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })

    client.on('disconnect', ()=>{
        const personaBorrada =usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('administrador', `${personaBorrada.nombre} abandono el chat`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonaPorSala(personaBorrada.sala));
    })
});