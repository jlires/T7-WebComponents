class CardGame extends HTMLElement {
    constructor() {
        super();
        this._title = "";
        this._description = "";
        this._image = "";
        this._rating = 0;
        this._rated = false;
        
    }
    
    connectedCallback() {
      // Initialize properties that depend on light DOM
      this.title = this.getAttribute('title') || this.title;
      this.description = this.getAttribute('description') || this.description;
      this.image = this.getAttribute('image') || this.image;
      this.rating = this.getAttribute('rating') || this.rating;
      this.rated = this.getAttribute('rated') || this.rated;
      // Check if shadowRoot exists first
      if (!this.shadowRoot) {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.template;
      }
      // Set the shadow img attributes.
      this.shadowRoot.querySelector('[name="title"]').innerHTML = this.title;
      this.shadowRoot.querySelector('#gameimg').src = this.image;
      this.shadowRoot.querySelector('[name="description"]').innerHTML = this.description;
      this.shadowRoot.querySelector('.rating-stars').innerHTML = `<star-rating stars=${this.rating} rated="${this.rated}"></star_rating>`;
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if (this.shadowRoot) {
            this.shadowRoot.querySelector(`[name="${name}"]`).innerHTML = this[name];
           }
    }

    static get observedAttributes () {
       return ['title', 'description'];
    }

    get title () {
    		console.log('get title()')
        return this._title;
     }
    set title (val) {
       console.log(`set title(${val})`);
       this._title = val;
    }

    get description () {
       console.log('get description()');
       return this._description;
    }
    set description (val) {
       console.log(`set description(${val})`);
        this._description = val;
    }
    
    get image () {
       return this._image;
    }
    set image (val) {
    	this._image = val;
    }
    
    get rating () {
       console.log('get rating()');
       return this._rating;
    }
    set rating (val) {
       console.log(`set rating(${val})`);
        this._rating = val;
    }

    get rated() {
        return this._rated;
    }

    set rated(val) {
        this._rated = val;
    }

    get template() {

        return `
        <div class="cardBox">
               <content>
                   <div class="card">
                       <div class="front">
                       			<div class="img-container">
                           <img id="gameimg" src="https://picsum.photos/500/300/?image=10"></img>
                           </div>
                           <h3 id="title"><slot name="title"></slot></h3>
                       </div>
                       <div class="back">
                           <p id="description"><slot name="description"></slot></p>
                       </div>
                   </div>
                   <div class="rating-stars">

                   </div>
               </content>
           </div>
           <style>
           
           			.cardBox {
                	margin-bottom: 40px;
                  margin-left: 40px;
                  height: 300px;
                  display: inline-block;
                }
           
           			.card {
                  /* Add shadows to create the "card" effect */
                  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                  transition: 0.3s;
                }

                /* On mouse-over, add a deeper shadow */

                /* Add some padding inside the card container */
       
               .cardBox:hover .card {
                   transform: rotateY( 180deg);
               }
               
               .rating-stars {
               	width: 100%;
                height: 50px;
               }
       
               .card {
                   background: white;
                   cursor: default;
                   height: 250px;
                   transform-style: preserve-3d;
                   transition: transform 0.4s ease 0s;
                   width: 100%;
                   -webkit-animation: giro 1s 1;
                   animation: giro 1s 1;
               }
               img {
                   width: 100%;
               }
               
               .img-container {
               			width: 100%;
                   height: 170px;
                   overflow: hidden;
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
                       height: 285px;
                   }
                   .cardBox:last-child {
                       margin-bottom: 3%;
                   }
               }
       
               @media screen and (max-width: 480px) {
                   .cardBox {
                       width: 94.5%;
                       height: 260px;
                   }
               }
           </style>
        `;
    }
}



window.customElements.define('card-game', CardGame);