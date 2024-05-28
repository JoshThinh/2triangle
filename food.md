---
permalink: /food
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grocery Sorting Game</title>
    <link rel="stylesheet" href="{{site.baseurl}}/food.css">
    <script src="{{site.baseurl}}/food.js"></script>
    <script src="{{site.baseurl}}/script/javascript/button.js"></script>
</head>

<body>
    <header class="second-header">
        <div class="box-center-header">
            <button class="btn-primary-right" onclick="games()">Games</button>
            <button class="btn-primary-mid" onclick="openFoodLeader()">Leaderboard</button>
        <hr>
    <h1>Grocery Sorting Game</h1>
    <div id="score">Score: 0</div>
    <div id="price">Price: 0</div>
    <div id="timer">Time left: 60 seconds</div>
    <button onclick="autoSortPantry()">Auto-Sort Pantry</button>
    <div id="pantry"></div>
    <div id="sections">
        <div class="section" data-section="Fruits">
            Fruits
            <select id="fruits-dropdown" multiple></select>
        </div>
        <div class="section" data-section="Vegetables">
            Vegetables
            <select id="vegetables-dropdown" multiple></select>
        </div>
        <div class="section" data-section="Dairy">
            Dairy
            <select id="dairy-dropdown" multiple></select>
        </div>
        <div class="section" data-section="Protein">
            Protein
            <select id="protein-dropdown" multiple></select>
        </div>
        <div class="section" data-section="Bakery">
            Bakery
            <select id="bakery-dropdown" multiple></select>
        </div>
    </div>
    <script src="food.js"></script>

<script>
    function openFoodLeader() {
        window.location.href = "{{site.baseurl}}/foodleader";
    }
</script>
<script type="module">
    import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';
    function postfoodscore(){

        const username = window.sessionStorage.username; 
        const url = uri + '/api/foods';
        const body = {
            uid: username,
            name:username,
            tokens: score
        };
          const authOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body:  JSON.stringify(body),
        };
        fetch(url, authOptions)
        .then(response => {
            if (!response.ok) {
                console.log("not success");
            }else{
            console.log("success");
            }
        })
        .catch(err => {
            console.error(err);
        });
    }
    window.postfoodscore = postfoodscore;
</script>