import {Game} from './games.js';
import {UserInterface} from './ui.js';
import { GameDetails } from './details.js';


let game= new Game();  
let ui = new UserInterface();
let gd = new GameDetails();
const navLink = document.querySelectorAll('.page .home .navbar-nav .nav-link');
const row = document.querySelector('.games .row');
let gameCard;



let cat;

if(localStorage.getItem('cat') == null)
    cat = 'mmorpg';
else{
    const catObj = JSON.parse( localStorage.getItem('cat') );
    cat = catObj.cat;
    ui.activeLink(navLink, navLink[catObj.index]);
}

game.showData( await game.fetchApi(cat));




navLink.forEach(function(elem, i){

    elem.addEventListener('click', async function(event){
        ui.activeLink(navLink ,this);
        ui.setLoading(row);
        ui.saveCatToLocalStorage({cat : this.getAttribute('data-genre'), index : i});
        game.showData( await game.fetchApi(this.getAttribute('data-genre')) ); 
    });

});


document.addEventListener('click', function(event){
    ui.closeNav(event.target);
})



window.addEventListener('scroll', function(){
    if(this.scrollY > 300)
        ui.arrowShow(true);
    else
        ui.arrowShow(false);
});


const arrowUp = document.querySelector('.arrow-up');

arrowUp.addEventListener('click', function(){
    ui.arrowUp();
})
