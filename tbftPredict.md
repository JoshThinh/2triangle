---
toc: true
comments: true
title: TBFT! Predict your Successes!
type: hacks
courses: { compsci: {week: 28} }
permalink: /tbftpredict/
---

<html>
    <style>
        .bg2 {
            color: black;
            font-size: large;
            width: 100;
            height: 100vh;
            background: url(https://media.giphy.com/media/xUOxeQaTAqYBXq5j1u/giphy.gif);
            background-repeat: no-repeat;
            background-size: cover;
            background-repeat: no-repeat;
            background-blend-mode: hard-light;
            font-weight: bold;
            text-align: center;
        }
        .results {
            color: limegreen;
            font-size: xx-large;
        }
        .badresults {
            color: red;
            font-size: xx-large;
        }
    </style>
    <head>
        <title>Whats your chance of winning in tbft?</title>
    </head>
    <body>
        <div class="container" class="bg2">
            <h1>Will you win?</h1>
            <form id="titanicForm"  >
                <label for="name">Name:</label>
                <input type="text" id="name" name="name"><br><br>
                 <label for="age">Age:</label>
                <input type="number" id="age" name="age"><br><br>
                <label for="sex">Sex:</label>
                <select id="sex" name="sex">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select><br><br>
                   <label for="dhand">Dominant Hand:</label>
                <select id="dhand" name="dhand">
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                </select><br><br>
                   <label for="fmove">First Move:</label>
                <select id="fmove" name="fmove">
                    <option value="one">1</option>
                    <option value="two">2</option>
                </select><br><br>
                     <label for="fattack">First Attack:</label>
                <input type="text" id="fattack" name="fattack"><br><br>
                <button type="submit" class="btn btn-primary">Predict</button>
            </form>
            <h1 id="result"></h1>
        </div>
        <script>
            // uri variable and options object are obtained from config.js
        //    import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';
            // Get the modal
            document.getElementById('titanicForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const form = event.target;
                var formData = {
                    'name': document.getElementById('name').value,
                    'age': parseInt(document.getElementById('age').value),
                    'sex': document.getElementById('sex').value,
                    'dominanthand': document.getElementById('dhand').value,
                    'firstmove': parseInt(document.getElementById('fmove').value),
                    'firstattack': parseInt(document.getElementById('fattack').value),
                };
            const url = 'http://127.0.0.1:8086/api/tbftML/predict';
                // Change options according to Authentication requirements
            const authOptions = {
                method: 'POST', // Override the method property
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, same-origin, omit
                headers: {
                'Content-Type': 'application/json',
                },
                body:  JSON.stringify(formData),
            };
                fetch(url, authOptions)
                .then(response => response.json())
                .then(data => {
                        // Create a text node with the death probability
                    // var textNode = document.createTextNode("Here's your chance of death: " + data.death_probability);
                    // // Clear any existing content in the result div
                    // document.getElementById('result').innerHTML = '';
                    // // Append the text node to the result div
                    // document.getElementById('result').appendChild(textNode);
                    // // Predict and Display Prediction result
                    var probability = (data.win * 100).toFixed(2) + '%'
                    // document.getElementById('result').innerHTML = "Here's your chance of death: " + data.death_probability;
                    document.getElementById('result').innerHTML = 'Your Chance of winning is = '+ probability;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        </script>
    </body>
</html>