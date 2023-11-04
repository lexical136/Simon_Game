var list = [];			//holds the values for the flashes
var inputlist = [];		//holds the values for the button presses
var inputAllowed = 0;	//When the player can and cannot press buttons
var n = 0; 				//Postion in the array
var score = 0;			
var failing = 0;		//If the user failed the squence
var lastgame = 0;		//value of last game
var highgame = 0;		//high score
var game =0;			//current score
var gameinprogress =0;	//if a game is in progress
var time = 500;			//timeing for functions

//Button press
function pushy(x){
	if(inputAllowed==1){
		inputlist.push(x);
	}
	
}


/* program starts here and after a win it returns to begin().
 it checks the score and changes the flash timeings depending on the score then goes to the function begin(). it also resets some values for the next squence */
function start(){
	if(gameinprogress==0){
		begin();
	}
}


function begin(){
		if(gameinprogress==0){	//if a game is in progress these values will not be reset
			game =0;
			list = [];
			time = 500;
		}
		gameinprogress=1;		//game now in progress
		failing = 0;			//some values are reset and a random number is added to the array
		n=0;
		inputlist = [];
		list.push(Math.floor(Math.random()*4));		//pushes random number on to list rounding down
		document.getElementById("startIn").style.background = "green";		//Start icon goes green
		setTimeout(flashOff, 3000);		//showes the list after 3 seconds
}

function flashOff(){
	if(list[n]==3 || failing>0){
		document.getElementById("bottomR").style.background = "gray";
	}
	if(list[n]==2 || failing>0){
		document.getElementById("bottomL").style.background = "gray";
	}
	if(list[n]==1 || failing>0){
		document.getElementById("topR").style.background = "gray";
	}
	if(list[n]==0 || failing>0){
		document.getElementById("topL").style.background = "gray";
	}
	setTimeout(flashOn, time);
}

function flashOn(){
	if(list[n]==3 || failing>0){
		document.getElementById("bottomR").style.background = "blue";
	}
	if(list[n]==2 || failing>0){
		document.getElementById("bottomL").style.background = "purple";
	}
	if(list[n]==1 || failing>0){
		document.getElementById("topR").style.background = "red";
	}
	if(list[n]==0 || failing>0){
		document.getElementById("topL").style.background = "green";
	}

	if(failing==0){		
		n=n+1;
		if(n<list.length){
			setTimeout(flashOff, 500);
		}
		else{
			inputAllowed = 1;
			n=0;
			setTimeout(inputs, 5000);																					//Fished flashing!
		}
	}

	if(failing>0 && failing<5){				//sets in motion a flashing sequence to signify failure 
		setTimeout(flashOff, 500);
		failing++;
	}

	
	
}

//checks if the sequence is a failure or not
function inputs(){
	
	for(i=0; i<list.length; i++){
		if(list[i]!=inputlist[i] || list.length!=inputlist.length){
			i=list.length
			failing=1;
			flashOff();//FAIL!!!!!
			gameinprogress=0;
			document.getElementById("startIn").style.background = "red";
			document.getElementById("round").innerHTML = game;
			if(game>highgame){
				highgame=game;
				document.getElementById("score").innerHTML = highgame;
			}
		}
		else if(i==list.length-1){
			//WIN!!!!!!
			game=game+list.length;
			if(list.length>=5){
				time=300;
			}
			else if(list.length>=9){
				time=200;
			}
			else if(list.length>=16){
				time=100;
			}
			setTimeout(begin, 1000);
		}
	}
	inputAllowed = 0;	//sequence check is done and flash too. User can now continue with input
}

