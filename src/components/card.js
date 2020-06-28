const info = [{title: "juego 1", img: "https://picsum.photos/500/300/?image=5",  description: "buenardo"},
                  {title: "juego 2", img: "https://picsum.photos/500/300/?image=14", description: "juego del añi"},
                  {title: "juego 3", img: "https://picsum.photos/500/300/?image=11", description: "Wenisimo hermanits"},
                  {title: "juego 4", img: "https://picsum.photos/500/300/?image=27", description: "la pulenta"},
                  {title: "juego 5", img: "https://picsum.photos/500/300/?image=13", description: "boi"},
                  {title: "juego 6", img: "https://picsum.photos/500/300/?image=9",  description: "de panini"}]


class CardGame extends HTMLElement {
    constructor() {
        super();
        this.importDocument = document.currentScript.ownerDocument;
    }
    connectedCallback() {
        let shadowRoot = this.attachShadow({ mode: 'open' });
        var t = this.importDocument.querySelector('#Gamecard');
        info.forEach(game => {
            let instance = t.content.cloneNode(true);
            // aquí cambio la info de la tarjeta
            instance.querySelector('#title').innerHTML = game.title;
            instance.querySelector('#gameimg').src = game.img;
            instance.querySelector('#description').innerHTML = game.description;
            shadowRoot.appendChild(instance);
        });
    }

    get template(){

        return `
        <div class="cardBox">
               <content>
                   <div class="card">
                       <div class="front">
                           <h3 id="title">Nombre Del Juego</h3>
                           <img id="gameimg" src="https://picsum.photos/500/300/?image=10"></img>
                       </div>
                       <div class="back">
                           <h3>Descripción</h3>
                           <p id="description"></p>
                       </div>
                   </div>
               </content>
           </div>
           <style>
               
               .cardBox {
                   float: left;
                   font-size: 1.2em;
                   margin: 1% 0 0 1%;
                   perspective: 800px;
                   transition: all 0.3s ease 0s;
                   width: 23.7%;
               }
       
               .cardBox:hover .card {
                   transform: rotateY( 180deg);
               }
       
               .card {
                   background: white;
                   cursor: default;
                   height: 450px;
                   border: black solid 2px;
                   border-radius: 50px;
                   transform-style: preserve-3d;
                   transition: transform 0.4s ease 0s;
                   width: 100%;
                   -webkit-animation: giro 1s 1;
                   animation: giro 1s 1;
               }
               img {
                   max-height: 60%;
                   max-width: 100%;
               }
       
               .card p {
                   margin-bottom: 1.8em;
               }
       
               .card .front,
               .card .back {
                   backface-visibility: hidden;
                   border-radius: 50px;
                   box-sizing: border-box;
                   color: black;
                   display: block;
                   font-size: 1.2em;
                   height: 100%;
                   padding: 0.8em;
                   position: absolute;
                   text-align: center;
                   width: 100%;
               }
       
               .card .back {
                   transform: rotateY( 180deg);
               }
       
               .card .back a {
                   padding: 0.3em 0.5em;
                   color: #fff;
                   text-decoration: none;
                   border-radius: 1px;
                   font-size: 0.9em;
                   transition: all 0.2s ease 0s;
               }
       
               .card .back a:hover {
                   background: #fff;
                   color: #333;
                   text-shadow: 0 0 1px #333;
               }
       
               @-webkit-keyframes giro {
                   from {
                       transform: rotateY( 180deg);
                   }
                   to {
                       transform: rotateY( 0deg);
                   }
                   }
       
                   @keyframes giro {
                   from {
                       transform: rotateY( 180deg);
                   }
                   to {
                       transform: rotateY( 0deg);
                   }
               }
       
               @media screen and (max-width: 767px) {
                   .cardBox {
                       margin-left: 2.8%;
                       margin-top: 3%;
                       width: 46%;
                   }
                   .card {
                       height: 285px;
                   }
                   .cardBox:last-child {
                       margin-bottom: 3%;
                   }
               }
       
               @media screen and (max-width: 480px) {
                   .cardBox {
                       width: 94.5%;
                   }
                   .card {
                       height: 260px;
                   }
               }
           </style>
        `;
       }
}



window.customElements.define('card-game', CardGame);