import 'whatwg-fetch'

class Cube {
    constructor() {
        this.cube = document.querySelector(".cube__object");
        this.walls = [...document.querySelectorAll(".cube__wall")];
        this.getWall = [
            "get-front", 
            "get-back", 
            "get-left", 
            "get-right", 
            "get-top", 
            "get-bottom"
            ];
        this.randWall = "get-front";

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
        const prevRandWall = this.randWall;
        this.cube.classList.remove(this.randWall);
        
        do {
            this.randWall = this.getWall[Math.floor(Math.random() * 6)];
        } while (this.randWall === prevRandWall);
        
        this.cube.classList.add(this.randWall);
    }
    
    getQuote(data) {
        const activeWall = this.walls[this.getWall.indexOf(this.randWall)];

        activeWall.querySelector(".quote__text").innerHTML = data.quote;
        activeWall.querySelector(".quote__author").innerHTML = data.author;
    }

    fetchQuote() {
         const options = {  
            method: 'GET',  
            headers: {  
                "X-Mashape-Key": "3lz9qcSfQ8mshskThzkNIgfZZMawp13jDe2jsn5h2DZc418EYw",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": 'aplication/json'
            },
            mode: 'cors'
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