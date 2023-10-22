class Usuarios  {
    constructor(){
        this.personas = [];        
    }

    agregarPersona(id, nombre, sala){
        const persona ={ id, nombre, sala};
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id){
        const persona = this.personas.filter(person =>person.id===id)[0];
        return persona
    }

    getPersonas(){
        return this.personas;
    }

    getPersonaPorSala(sala){
        const personasEnSarala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSarala;
    }

    borrarPersona(id){
        const personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(person =>person.id !== id);        
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}