class RatingStarsClass extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode:'open'});
		this.shadowRoot.innerHTML = this.template;
		this.rated = this.getAttribute('rated') === "true" ? true : false;

		this.stars = this.shadowRoot.querySelector('#rating');
		this.initialize();
		this.stars.addEventListener('click', function (e) {
			if (!this.rated) {
				this.rated = true;
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
			}


		});

		//console.log(parseInt(this.getAttribute('stars')) || 3);
	}

	static get observedAttributes() {
		return ['stars'];
	}

	initialize() {
		if (this.getAttribute('stars')) {
			let stars = Math.round(parseInt(this.getAttribute('stars')));
			let action = 'add';
			let i = 0;
			for (const span of this.stars.children) {
				if (i === stars) {
					action = 'remove';
				}
        span.classList[action]('active');
        i += 1;
			}
		}
	}

	get template() {
	 return `
			<style>
			#rating { font-size: 0; }
			#rating span { font-size: 30px; }
			#rating span::before { content: "☆"; }
			#rating span.active::before {content: "★"; }
			#rating span:hover { cursor: pointer; }
      #rating { cursor: pointer; }
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
