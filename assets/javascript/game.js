
/* *******************GLOBAL VARIABLES *********************/
    var winsCounter=0;
    var lossesCounter =0;
    var totalScore = 0;
    var rndNumber =0;
    var arrCrystals = [];
    var imgSrc = ["../unit-4-game/assets/images/c1.png", 
    "../unit-4-game/assets/images/c2.png",
    "../unit-4-game/assets/images/c3.png", 
    "../unit-4-game/assets/images/c4.png"];
    var crystals = $(".crystals");
    var score = $("#score");
/* *******************FUNCTIONS *********************/
    // Function to generate random number and crystal numbers
    var getRndNum = function (min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var assignRndNum = function () {
         //Generating the random number to match
         rndNumber = getRndNum (19,120);
         var displayRndNumber= $("#randomNumber");
         displayRndNumber.html("<strong>"+rndNumber+"</strong>");
         console.log(rndNumber);
 
         //Creating random numbers for each crystal and value is saved into an array
         //Each crystal should have a random hidden value between 1 - 12 and they will be unique.
         while(arrCrystals.length < 4){
             var randomnumber = getRndNum (1,12);
             if(arrCrystals.indexOf(randomnumber) > -1) continue;
             arrCrystals[arrCrystals.length] = randomnumber;
         }
         console.log(arrCrystals);
        //Creating image tags and assign value from array to each element
         for (var i=0; i<arrCrystals.length; i++) {
            var imgTags= $("<img>");
            imgTags.addClass("crystal-image");
            imgTags.attr("src" , imgSrc[i]);
            imgTags.attr("value", arrCrystals[i]);
            //crystals.html(imgTags);
            crystals.append(imgTags);
        }
        
    }
    //Initializing game
    var gameStarts = function () {
        crystals.empty();
        assignRndNum();
        score.html("<strong> Your total score is: <br>"+totalScore+"</strong>");
        console.log(crystals);
   }

 /* *******************CALLS *********************/   
    gameStarts ();
 
    $(document).on("click",".crystal-image", function() {
        totalScore += parseInt ($(this).attr("value"));
        console.log (totalScore);
        score.html("<strong> Your total score is: <br>"+totalScore+"</strong>");
        if (totalScore==rndNumber) {
			winsCounter ++;
			var displayWins= $("#wins");
            displayWins.html("<strong> Wins: "+winsCounter+"</strong>");
            totalScore =0;
            //crystals.empty();
            gameStarts ();
		} 
		else if (totalScore>rndNumber){
			lossesCounter ++;
			var displayLosses= $("#losses");
            displayLosses.html("<strong> Losses: "+lossesCounter+"</strong>");
            totalScore =0;
            //crystals.empty();
            gameStarts ();
		}
    })

    //Event stop propagation - not completed yet
    document.onkeypress = function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.currentTarget.innerHTML = "Do not refresh the page"
    }

