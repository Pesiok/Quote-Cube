import 'whatwg-fetch'

class Cube {
    constructor() {
        this.cube = document.querySelector(".cube__object");
        //cube__wall elements in HTML's order
        this.walls = [...document.querySelectorAll(".cube__wall")];
        //cube__object css modificators
        this.getWall = [
            "get-front", 
            "get-back", 
            "get-left", 
            "get-right", 
            "get-top", 
            "get-bottom"
            ];
        this.randWall = "get-front";
        this.twitterBtn = document.getElementById("twitterBtn");

        this.events();
    }

     events() {
         document.addEventListener("DOMContentLoaded", () => {
             cube.addEventListener("click", this.fetchQuote.bind(this));
             cube.addEventListener("keydown", event => {
                if (event.keyCode === 13) {
                    //enter
                    this.fetchQuote();
                } else if (event.keyCode === 32){
                    //space
                    this.fetchQuote();
                } else {
                    event.preventDefault();
                }
             });
         })
     }
     
     getRandomWall() {
        const prevRandWall = this.randWall,
        prevWall = this.walls[this.getWall.indexOf(prevRandWall)];

        prevWall.setAttribute("aria-hidden", "true");
        this.cube.classList.remove(`cube__object--${this.randWall}`);
        
        do {
            this.randWall = this.getWall[Math.floor(Math.random() * 6)];
        } while (this.randWall === prevRandWall);
        
        this.cube.classList.add(`cube__object--${this.randWall}`);
    }
    
    getQuote(data) {
        const activeWall = this.walls[this.getWall.indexOf(this.randWall)];
        const queryString = "https://twitter.com/share?text=" + encodeURIComponent(data.quote + " ~ " + data.author);
        
        //change wall content
        activeWall.setAttribute("aria-hidden", "false");
        activeWall.querySelector(".quote__text").innerHTML = data.quote;
        activeWall.querySelector(".quote__author").innerHTML = data.author;
        //update Share link
        this.twitterBtn.setAttribute("href", queryString);
    }
    
    fetchQuote() {
         const options = {  
            method: "GET",  
            headers: {  
                "X-Mashape-Key": "3lz9qcSfQ8mshskThzkNIgfZZMawp13jDe2jsn5h2DZc418EYw",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "aplication/json"
            },
            mode: "cors"
        },
        endpoint = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies";

        //fetching 
        
        fetch(endpoint, options)
            .then(response => response.json())
            .then(data => {
                this.getRandomWall();
                this.getQuote(data);
            })
            .catch(error => {console.log(error.message)});

    }
}

export default Cube;