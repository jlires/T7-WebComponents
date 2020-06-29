class RatingStarsClass extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML = this.template;
      
        this.stars = this.shadowRoot.querySelector('#rating');
        this.stars.addEventListener('click', function (e) {
            let action = 'add';
            let i = 0;
            let value = 1;
            for (const span of this.children) {
                span.classList[action]('active');
                i += value;
                if (span === e.target) {
                    action = 'remove';
                    value = 0;
                }
            }
            console.log(i);
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