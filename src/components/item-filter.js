class ItemFilter extends HTMLElement {
  constructor() {
    super();
    this._categoryButtonTitle = "Todos";
    this._categorySelected = "Todos";
    this._searchInput = "";
    this.show = false;
    this.games = [];
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});

    this.shadowRoot.innerHTML = this.template;

    this.categoryButtonElement = this.shadowRoot.querySelector("button");
    this.categoryButtonElement.addEventListener("click", () => this.toggleDropdown());

    this.categoryDropdownElement = this.shadowRoot.querySelector(".dropdown-menu");
    this.categoryDropdownElement.style.display = "none";

    this.searchButtonElement = this.shadowRoot.querySelector("#searchBtn");
    this.searchButtonElement.addEventListener("click", () => this.search());

    this.searchInputElement = this.shadowRoot.querySelector("#table_filter");

    this.getGames();
  }

  get categorySelected(){
    return this._categoryButtonTitle;
  }

  set categorySelected(value){
    this._categorySelected = value.slice(0,10);
    this._categoryButtonTitle = value.slice(0,10);
    this.categoryButtonElement.querySelector(".label-icon").textContent = this._categorySelected;
  }

  get searchInput(){
    return this._searchInput;
  }

  set searchInput(value){
    console.log(value);
    this._searchInput = value;
  }

  toggleDropdown() {
    this.show = !this.show;
    this.categoryDropdownElement.style.display = this.show ? "block" : "none";
    this.dispatchEvent(new CustomEvent("showDropdown", { detail: this.show }));
  }

  changeCategory(element) {
    this.categorySelected = element.textContent;
    this.categorySelectElements.forEach(el => {
      el.classList.remove("selected");
    });
    element.classList.add("selected");
    this.toggleDropdown();
  }

  search() {
    this.searchInput = this.searchInputElement.value;
    this.showGames(this.games, {
			contains: this.searchInputElement.value,
			type: this.categorySelected,
		});
  }

  getGames() {
    fetch("https://peaceful-stream-32007.herokuapp.com/games")
    .then(response => {
      if (response.status !== 200) {
        console.log("Error: ", response.status);
      }
      else {
        return response.json();
      }
    })
    .then(jsonData => {
      this.games = jsonData.games;
      this.categories = new Set(jsonData.games.map((game) => game.tematica));
      this.generateCategories(this.categories)
      this.showGames(this.games, {});
		})
		.then(() => {
			this.categorySelectElements = this.shadowRoot.querySelectorAll(".dropdown-menu li");
			console.log(this.categorySelectElements);
			this.categorySelectElements.forEach(el => {
				el.addEventListener("click", (event) => {
					this.changeCategory(event.target);
				})
			});
		})
  }

  generateCategories(categories) {
  	const categoriesListElement = this.shadowRoot.querySelector(".category_filters");
    categories.forEach(category => {
			const categoryElement = document.createElement("li");
      categoryElement.innerHTML = category;
			categoriesListElement.appendChild(categoryElement);
    });
  }

  showGames(games, filter) {
    const cardsRowElement = this.shadowRoot.querySelector(".row-cards");
    cardsRowElement.innerHTML = "";
    let cardElementsHTML = "";

    if (filter.contains) {
    	games = games.filter(game => game.title.includes(filter.contains));
		}
		
		if (filter.type && filter.type !== "Todos") {
			games = games.filter(game => {
				return game.tematica.slice(0, 10) === filter.type
			});
		}

    games.forEach((game) => {
      const didUserRateIt = game.raters.includes(window.website.user);
      const rating = didUserRateIt ? game.raters_values[window.website.user] : game.rating;
      cardElementsHTML = cardElementsHTML + `
        <card-game game-title="${game.title}" description="${game.description}" image="${game.image}" tematica="${game.tematica}" players="${game.players}" difficulty="${game.difficulty}"
        min_age="${game.min_age}" duration="${game.duration}" rating="${rating}" rated="${didUserRateIt}" ></card-game>
      `;
    });

    cardsRowElement.innerHTML = cardElementsHTML;
  }

  get template() {
    return `
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="container">
      <div class="row searchFilter" >
         <div class="col-sm-12" >
          <div class="input-group" >
           <input id="table_filter" type="text" class="form-control" aria-label="Text input with segmented button dropdown" >
           <div class="input-group-btn" >
            <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="label-icon">Todos</span> <span class="caret" >&nbsp;</span></button>
            <div class="dropdown-menu dropdown-menu-right" >
               <ul class="category_filters">
                <li class="selected">Todos</li>
               </ul>
            </div>
            <button id="searchBtn" type="button" class="btn btn-secondary btn-search" ><span class="glyphicon glyphicon-search" >&nbsp;</span> <span class="label-icon" >Search</span></button>
           </div>
          </div>
         </div>
      </div>
      <div class="row-cards">
      </div>
    </div>
    <style>
    .searchFilter {
      margin-bottom: 20px;
    }
    .searchFilter .btn-secondary {
        color: #373a3c;
        background-color: #fff;
        border: 1px solid #ccc;
    }
    .searchFilter .btn-secondary:hover {
        color: #373a3c;
        background-color: #e6e6e6;
        border-color: #adadad;
    }
    .searchFilter .btn-search {
      background-color: #00aced;
      color: #fff;
      border: 1px solid #00aced;
    }
    .searchFilter .btn-search:hover {
      background-color: #b20a11;
      color: #fff;
      border: 1px solid #b20a11;
    }
    .searchFilter .label-icon {
      display: none;
    }
    .searchFilter .glyphicon {
        margin-right: -15px;
    }
    .searchFilter .dropdown-menu .category_filters {
      min-width: 178px;
      width: 100%;
      margin: 15px 0 0 -25px;
    }
    .searchFilter .dropdown-menu-right {
        right: 170px;
        min-width: 175px;
      top: 90%;
    }
    .searchFilter .dropdown-menu .category_filters li {
      list-style-type: none;
      padding: 2px 10px;
      font-size: 18px;
      cursor: pointer;
    }

    .searchFilter .dropdown-menu .category_filters li.selected {
      background-color: #00aced;
      color: white;
    }
    .searchFilter .dropdown-menu .category_filters li:hover {
      background-color: #00aced;
      color: white;
    }
    .searchFilter .dropdown-menu .category_filters label {
      margin-left: 15px;
    }
    @media (min-width: 1400px) {
      .ct-header .ct-jumbotron .inner {
        max-width: 470px;
        min-height: 230px;
      }
    }
    @media (max-width: 1400px) {
      .ct-header-slider .item {
        background-size:contain;
        background-repeat: no-repeat;
        background-position: center top;
      }
    }
    @media (min-width: 769px) and (max-width: 1400px) {
      .ct-header-slider .item {
        height: auto;
      }
    }
    @media (max-width: 1260px) {
      #dots-container {
        display: none;
      }
    }
    @media (min-width: 992px){
      .ct-footer2 .ct-newsletter {
        max-width: 100%;
      }
      #dots-container {
        bottom: 100px;
      }
    }
    @media (min-width: 768px){
      .ct-searchbar:before {
        height: 92px;
        bottom: -1px;
      }
      .page-scrolled .navbar .navbar-nav li > * {
        min-height: 67px;
        height: 67px;
      }
      .page-scrolled .navbar .navbar-nav {
        height: 100%!important;
      }
      .ct-current-facts h2 {
        margin: 0 auto 0px;
      }
      .contentNews .ct-recent-news {
        flex-direction: inherit;
      }
      .contentFaq .faq_question .col-sm-11 {
        padding-right: 0px;
      }
      .peopleDetail h2 {
        margin-top: -5px;
      }
      .searchFilter .btn {
        min-width: 172px;
      }
      .searchFilter .label-icon {
        display: inline-block;
      }
      .searchFilter .glyphicon {
        margin-right: -5px;
      }
      .ct-header .ct-jumbotron {
        top: 0;
        margin-top: 5%;
      }
      .ct-header .ct-jumbotron h1 {
        font-size: 2.5em;
      }
      .ct-news.ct-news--bigger h3 {
        font-size: 41px;
        line-height: 1.4;
      }
    }
    @media (max-width: 768px){
      .ct-header .ct-jumbotron {
        width: 80%;
        margin: 20px 10px;
        top: 40%;
        width: 95%;
      }
      .ct-header .ct-jumbotron .inner {
        max-width: 100%;
      }
      #dots-container {
        display: none;
      }
      .main-section {
        margin-top: -80px;
      }
      .searchFilter .dropdown-menu-right {
      right: 0px;
      }
    }
    </style>
    `;
  }
}

customElements.define('item-filter', ItemFilter);
