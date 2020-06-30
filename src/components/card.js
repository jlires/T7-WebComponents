class CardGame extends HTMLElement {
    constructor() {
        super();
        this.title = "";
        this.description = "";
        this.image = "";
        this.rating = 0;
        this.rated = false;
        this.tematica = "";
        this.difficulty = "";
        this.players = "";
        this.min_age = "";
        this.duration = "";

    }

    connectedCallback() {
      // Initialize properties that depend on light DOM
      this.title = this.getAttribute('game-title') || this.title;
      this.description = this.getAttribute('description') || this.description;
      this.image = this.getAttribute('image') || this.image;
      this.rating = this.getAttribute('rating') || this.rating;
      this.rated = this.getAttribute('rated') || this.rated;
      this.tematica = this.getAttribute('tematica') || this.tematica;
      this.difficulty = this.getAttribute('difficulty') || this.difficulty;
      this.players = this.getAttribute('players') || this.players;
      this.min_age = this.getAttribute('min_age') || this.min_age;
      this.duration = this.getAttribute('duration') || this.duration;

      // Check if shadowRoot exists first
      if (!this.shadowRoot) {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.template;
      }
      // Set the shadow attributes.
      this.shadowRoot.querySelector('#title').innerHTML = this.title;
      this.shadowRoot.querySelector('#gameimg').src = this.image;
      this.shadowRoot.querySelector('#description').innerHTML = this.description;
      this.shadowRoot.querySelector('#players').innerHTML = this.players;
      this.shadowRoot.querySelector('#duration').innerHTML = this.duration;
      this.shadowRoot.querySelector('#min_age').innerHTML = this.min_age;
      this.shadowRoot.querySelector('#difficulty').innerHTML = this.difficulty;
      this.shadowRoot.querySelector('#tematica').innerHTML = this.tematica;
      this.shadowRoot.querySelector('.rating-stars').innerHTML = `
        <star-rating stars=${this.rating} rated="${this.rated}" game-title="${this.title}">
        </star-rating>
      `;

    }

    get template() {

        return `
        <div class="cardContainer">
        <div class="cardBox">
                   <div class="card">
                       <div class="front">
                       			<div class="img-container">
                           <img id="gameimg" src="https://picsum.photos/500/300/?image=10"></img>
                           </div>
                           <h3 id="title"></h3>
                       </div>
                       <div class="back">
                           <p id="description"></p>
                           <table>
                           <tbody>
                             <tr>
                              <td>Dificultad:</td>
                              <td id="difficulty"></td>
                             </tr>
                             <tr>
                              <td>Temática:</td>
                              <td id="tematica"></td>
                             </tr>
                             <tr>
                              <td>Jugadores:</td>
                              <td id="players"></td>
                             </tr>
                             <tr>
                              <td>Edad:</td>
                              <td id="min_age"></td>
                             </tr>
                             <tr>
                              <td>Duración:</td>
                              <td id="duration"></td>
                             </tr>
                           </tbody>
                           </table>
                       </div>
                   </div>
           </div>
           <div class="rating-stars"></div>
           </div>
           <style>

           			.cardContainer {
                	margin-bottom: 40px;
                  margin-left: 40px;
                  height: 350px;
                  display: inline-block;

                }

                .cardBox {
                  height: 300px;
                  perspective: 1000px;
                  position: relative;
                }

               .cardBox:hover .card {
                   transform: rotateY(180deg);
               }

               .rating-stars {
                   width: 100%;
                   height: 50px;
                   text-align: center;

                   border-style: solid;
                   border-width: 0 2px 2px 2px;
                   border-color: rgba(0,0,0,0.05);
               }
               .rating-stars rating {
                   margin: 0;
               }

               .card {
                   height: 100%;
                   width: 100%;
                   transition: transform 0.8s;
  								 transform-style: preserve-3d;
                   /* box-shadow: 0 0 4px rgba(0,0,0,0.2); */
                   border-style: solid;
                   border-width: 2px 2px 0 2px;
                   border-color: rgba(0,0,0,0.05);
                   position:relative;
                   top: -2px;
               }
               img {
                   height: 100%;
               }

               .img-container {
               		 width: 100%;
                   height: 170px;
                   overflow: hidden;
               }



               .front, .back {
               		 position: absolute;
                   backface-visibility: hidden;
                   -webkit-backface-visibility: hidden; /* Safari */
                   height: 100%;
                   width: 100%;
               }

               .front p {
                   margin-bottom: 1.8em;
                   color: black;
               }

               .back {
                   transform: rotateY(180deg);
               }

               .back p {
               		padding: 0 20px 0 20px;
                   text-align: justify;
                   hyphens: auto;
                   font-size: 1em;
               }

               .back table {
               		padding: 20px;
                  font-size: 1em;
                  width: 100%;
               }

               .back table tr td:nth-child(2) {
               		text-align: right;
               }

               .back table tr td:nth-child(1){
               		text-align: left;
                  font-weight: bold;
               }

               .front {
               		 text-align: center;
                   font-size: 1.2em;
               }

               .cardContainer {
                	margin-left: 2.8%;
                	margin-top: 3%;
                	width: 30%;
                	height: 285px;
                }
                	.cardContainer:last-child {
                	margin-bottom: 3%;
                }

               @media screen and (max-width: 1150px) {
                   .cardContainer {
                       width: 46%;
                       height: 285px;
                   }
               }

               @media screen and (max-width: 800px) {
                   .cardContainer {
                       width: 100%;
                       height: 260px;
                       margin-left: 0;
                   }
               }
           </style>
        `;
    }
}



window.customElements.define('card-game', CardGame);
