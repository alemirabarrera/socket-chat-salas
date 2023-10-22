//funciones para renderiazar usuarios

var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

//referencias de Jquery
//var divUsuarios = $('#divUsuarios');

//referencias
var divUsuarios = document.querySelector('#divUsuarios');
var formEnviar = document.querySelector('#formEnviar');
var txtMensaje = document.querySelector('#txtMensaje');
var divChatbox = document.querySelector('#divChatbox');



function renderizarUsuarios( personas ){
    console.log(personas);
    var html = `<li>
                <a href="javascript:void(0)" class="active"> Chat de <span>${sala}</span></a>
                </li>`;
    for (let i = 0; i < personas.length; i++) {
        const persona = personas[i];
        html += `<li>
                <a data-id="${persona.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${persona.nombre} <small class="text-success">online</small></span></a>
                </li>`   
    } 
    divUsuarios.innerHTML = html    
}

function renderizarMensajes(mensaje, yo){

    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours()+':'+fecha.getMinutes();
    var li =document.createElement("li")
    var adminClass = 'info';
     if(mensaje.nombre === 'administrador'){
        adminClass = 'danger'
    } 

    if(yo){
        li.setAttribute('class', 'reverse');
        li.innerHTML = `<div class="chat-content">
                                <h5>${mensaje.nombre}</h5>
                                <div class="box bg-light-inverse">${mensaje.mensaje}</div>
                                </div>
                                <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
                                <div class="chat-time">${hora}</div>`;
    }else{       
        li.innerHTML = `<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
                        <div class="chat-content">
                            <h5>${mensaje.nombre}</h5>
                            <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>
                        </div>
                        <div class="chat-time">${hora}</div>`;                     
    }
    divChatbox.append(li);     
}


/* //fix - jquery is not working.
function scrollBottom() {
    // selectors
    var newMessage = divChatbox.children('li:last-child');
    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}
 */

//Listeners
divUsuarios.addEventListener('click', (e)=>{
    let id = e.target.getAttribute('data-id');
    if(id){
        console.log(e.target)
        console.log(id)
    }            
}) 


formEnviar.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(txtMensaje.value.trim().length == 0){
        return;
    }
    //Enviar información
    socket.emit('crearMensaje', {
        nombre,
        mensaje: txtMensaje.value.trim()
    }, function(mensaje) {
        txtMensaje.value = '';
        renderizarMensajes(mensaje, true)
        //scrollBottom();               
    });

})

/* divUsuarios.on('click', 'a', function(){
    var id = $(this).data('id');
    console.log(id);

})
 */

