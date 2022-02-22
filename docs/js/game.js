const Game=(()=>{
    'use strict'
    const btnAsk          = document.querySelector('#btn-pedirCarta'),
          btnStop         = document.querySelector('#btn-detener'),
          btnNewGame      = document.querySelector('#btn-nuevoJuego'),
          btnShuffleCards = document.querySelector('#btn-barajear');
    const divCardsPlayers    = document.querySelectorAll('.divCartas'),
          markerPlayers   = document.querySelectorAll('small');

    const types     = ['C','D','H','S'],
          exeptions = ['A','J','Q','K'];
          
    let scorePlayers  = [],          
        deck          = [],
        scrambled     = 0;

    const createDeck = () => {
        deck=[];
        for(let i=2; i <= 10; i++){
        types.forEach(element => {
            deck.push(i + element);
            });   
        }
        types.forEach( tipo =>{
            exeptions.forEach(element =>{
            deck.push(element + tipo);
            });
        });
        deck=_.shuffle(deck);
    };
    const takeCard = ()=>{
        btnShuffleCards.disabled=true;
        if(deck.length===0) throw 'No hay cartas en el deck';
        return deck.pop();
    };
    const valueCard = card => {
        const valueCard=card.substring(0, card.length-1);
        return (isNaN(valueCard))? 
               (valueCard==='A')? 11 : 10
               :valueCard*1;  
    };
    const accumulatePoints = (card,turn)=>{
        scorePlayers[turn] += valueCard(card);
        markerPlayers[turn].innerText = scorePlayers[turn];
        showCard(card,turn);
    };   
    const showCard = (card,player) =>{
        const img = document.createElement("img"); // <div></div>
        img.className = "carta"; 
        img.alt="carta";
        img.src= `cartas/${card}.png`;    // <div id="app"></div>
        divCardsPlayers[player].append(img);
    };
    const isWinner = (winner)=>{
        let res;
        if(winner){
            alert('Felicidades Ganaste');       
            res= 'Ganaste sacaste 21';
        }else{
            alert('Perdiste inicia un nuevo juego');      
            res= 'Perdiste';
        }
        btnAsk.disabled = true;
        btnStop.disabled = true;
        return res;
    };
    const newGame=( numberPlayers = 2 )=>{
        createDeck();
        scorePlayers=[];
        for (let i = 0; i < numberPlayers ; i++) {
            scorePlayers.push(0);            
        }
        scrambled=0;
        btnAsk.disabled = false;
        btnStop.disabled = false;
        btnShuffleCards.disabled = false;
        btnShuffleCards.innerText='Barajear';   
        markerPlayers.forEach(marker => {  marker.innerText=0;    });
        for (const img of document.querySelectorAll('img')) {
            img.remove();
        }
    };
    const AskCard=()=>{
        accumulatePoints(takeCard(),0);    
        setTimeout(()=>{
            if(scorePlayers[0]>21) isWinner(false);
            else if(scorePlayers[0]===21) isWinner(true);   
        },100);
    }
    

    btnAsk.addEventListener('click', ()=>{  AskCard();  });
    btnNewGame.addEventListener('click',()=>{ newGame();  });
    btnStop.addEventListener('click',()=>{ 
        while(scorePlayers[scorePlayers.length-1] <= scorePlayers[0]){   
            accumulatePoints(takeCard(),scorePlayers.length-1);         
        }  
        setTimeout(()=>{
            if(scorePlayers[scorePlayers.length-1]>21) isWinner(true);
            else isWinner(false);
        },500);
    });
    btnShuffleCards.addEventListener('click',()=>{
        deck=_.shuffle(deck);
        btnShuffleCards.innerText=`Barajeadas:${++scrambled}`;    
    });
    return {
        nuevoJuego: newGame
    };

})();

Game.nuevoJuego();

