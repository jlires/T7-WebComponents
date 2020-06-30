class RatingStarsClass extends HTMLElement {
	constructor() {
		super();
		this.game_title = this.getAttribute('game-title');
		this.attachShadow({mode:'open'});
		this.shadowRoot.innerHTML = this.template;
		this.rated = this.getAttribute('rated') === "true" ? true : false;

		this.stars = this.shadowRoot.querySelector('#rating');
		this.initialize();
		this.stars.querySelectorAll('span').forEach(star => {
			star.addEventListener('click', (e) => this.rate(e.target));
		});
		this.stars.addEventListener('mouseleave', (e) => this.reset());
		this.stars.querySelectorAll('span').forEach(star => {
			star.addEventListener('mouseover', (e) => this.hover(e.target));
		});

		this.rating = this.getAttribute('stars');
	}

	static get observedAttributes() {
		return ['stars'];
	}

	initialize() {
		this.rating = this.getAttribute('stars');
		let stars = this.stars.querySelectorAll('span');
		stars.forEach(star => {
			if (star.getAttribute('rating') <= this.rating) {
				star.classList['add']('active');
			}
			else {
				star.classList['remove']('active');
			}
			if (this.rated) {
				star.classList['add']('rated');
			}
		})
	}

	rate(target) {
		if (!this.rated) {
			let rating = parseInt(target.getAttribute('rating'));

			fetch("https://peaceful-stream-32007.herokuapp.com/rate", {
        method: 'POST',
				body: JSON.stringify({
					user: window.website.user,
					rating: rating,
					title: this.game_title,
				}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
	    .then(response => {
	      if (response.status !== 200) {
	        console.log("Error: ", response.status);
	      }
	      else {
					this.rated = true;
					this.rating = rating;

					let stars = this.stars.querySelectorAll('span');
					stars.forEach(star => {
						if (star.getAttribute('rating') <= rating) {
							star.classList['add']('active');
							star.classList['add']('rated');
						}
						else star.classList['remove']('active');
					})
	      }
	    })
		}
	}

	hover(target) {
		if (!this.rated) {
			let rating = parseInt(target.getAttribute('rating'));

			let stars = this.stars.querySelectorAll('span');
			stars.forEach(star => {
				if (star.getAttribute('rating') <= rating) {
					star.classList['add']('active');
					star.classList['add']('rated');
				}
				else {
					star.classList['remove']('active');
					star.classList['remove']('rated');
				}
			})
		}
	}

	reset() {
		if (!this.rated) {
			let stars = this.stars.querySelectorAll('span');
			stars.forEach(star => {
				if (star.getAttribute('rating') <= this.rating) {
					star.classList['add']('active');
					star.classList['remove']('rated');
				}
				else {
					star.classList['remove']('active');
					star.classList['remove']('rated');
				}
			})
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
			#rating span { color: #FBE551; }
			#rating .rated { color: #F6BB0A; }
			</style>
			<div id='rating'>
				<span rating='1'></span>
				<span rating='2'></span>
				<span rating='3'></span>
				<span rating='4'></span>
				<span rating='5'></span>
			</div>
	 `;
 }
}

window.customElements.define('star-rating', RatingStarsClass);
