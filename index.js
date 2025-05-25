const express = require("express");
const path = require('path'); // For creating correct file paths
const { engine } = require('express-handlebars'); // The Handlebars engine
const server = express();
const port = 3001;


server.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
}));
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, 'views'));

server.use(express.static(path.join(__dirname, 'public_html')));

const menuPageData = {
    pageTitle: "Today's Menu", // For the <title> and <h1> in main.hbs
    dishes: [
        { name: "Spaghetti Carbonara", price: "€4.50", description: "Creamy pasta with pancetta and pecorino." },
        { name: "Margherita Pizza", price: "€6.00", description: "Classic pizza with tomato, mozzarella, and basil." },
        { name: "Caesar Salad", price: "€9.00", description: "Crisp romaine lettuce with Caesar dressing and croutons." }
    ]
};

const rankingsPageData = {
    pageTitle: "Dish Rankings", // For the <title> and <h1> in main.hbs
    rankedDishes: [
        { rank: 1, name: "Spaghetti Carbonara", rating: "4.8/5", votes: 95 },
        { rank: 2, name: "Margherita Pizza", rating: "4.5/5", votes: 80 },
        { rank: 3, name: "Tiramisu", rating: "4.3/5", votes: 70 }
    ]
};

server.get("/", function(req, res) {

    res.render('home', { pageTitle: "Mensa App Home" });
});

// Route for the "Today's Menu"
server.get("/menu", function(req, res) {
    res.render('menu', menuPageData); // Renders views/menu.hbs
});

// Route for the "Dish Rankings"
server.get("/rankings", function(req, res) {
    res.render('rankings', rankingsPageData); // Renders views/rankings.hbs
});


// Server Start
server.listen(port, function () {
    console.log("Express listening on " + port);
});



