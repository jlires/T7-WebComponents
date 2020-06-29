class RatingStarsClass extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML = this.template;
      
      this.stars = this.shadowRoot.querySelector('#rating');
      this.stars.addEventListener('click', function (e) {
            let action = 'add';
            for (const span of this.children) {
                span.classList[action]('active');
                if (span === e.target) action = 'remove';
            }
        });
    }
    
    get template() {
     return `
        <style>
        #rating { font-size: 0; }
        #rating span { font-size: 40px; }
        #rating span::before { content: "☆"; }
        #rating span.active::before {content: "★"; }
        #rating span:hover { cursor: pointer; }        
        </style>
        <div id='rating'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>                     
     `;
   }
}
    
window.customElements.define('star-rating', RatingStarsClass);