'use strict';

function openModal() {
    document.querySelector('#overlay').setAttribute('class','overlay--appear');
    document.querySelector('#modal').setAttribute('class','modal--appear');
}

function closeModal(){
    document.querySelector('#overlay').setAttribute('class','overlay--vanish');
    document.querySelector('#modal').setAttribute('class','modal--vanish');
}