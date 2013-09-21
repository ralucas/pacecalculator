$(document).ready(function(){

	var answer;

$("#runButton").on("click", function(){

	var paceHourV = $("#paceHour").val();
	var paceMinV = $("#paceMin").val();
	var paceSecV = parseInt($("#paceSec").val())||0;
	var distanceV = $("#dist").val();
	var ttHourV = $("#ttHour").val();
	var ttMinV = $("#ttMin").val();
	var ttSecV = parseInt($("#ttSec").val())||0;

	var paceConv = (paceHourV*3600) + (paceMinV*60) + paceSecV;

	var ttConv = (ttHourV*3600) + (ttMinV*60) + ttSecV;

	var totalTime = 0;

	var totalPace = 0;

	var totalDistance = 0;

	var paceList = $("#pace-list");
	var distList = $("#dist-list");
	var ttList = $("#tt-list");

	var divPace = $("#pace");
	var divDistance = $("#distance");
	var divTotalTime= $("#totalTime");

	var doubleDigit = function(num){
			if(num < 10){
			return "0"+num;
			}

			else{
				return num;
			}
		};	

	var timeConv = function(time){
			var hour = 0;
			var min = 0;
			var sec = 0;

			if(time > 3600){
				hour = Math.floor(time/3600);
				min = Math.floor((time%3600)/60);
				sec = ((time%3600)%60) % 60;
			    return hour + ":" + doubleDigit(min) + ":" + doubleDigit(sec);
			}
			else if (time > 60){
				min = Math.floor(time/60);
				sec = (time%60) % 60;
				return doubleDigit(min) + ":" + doubleDigit(sec);
			}
			else {
				return time + " seconds";
			}	
		};
	
	console.log(paceHourV);
	console.log(paceMinV);
	console.log(paceSecV);
	console.log(paceConv);

		if((paceHourV > 0 || paceMinV > 0 || paceSecV > 0) && (distanceV > 0)){
			totalTime = distanceV * paceConv;
			answer = timeConv(totalTime);
			ttList.slideUp();
			divTotalTime.append("<h4>"+answer+"</h4>");
		}
		else if((ttHourV > 0 || ttMinV > 0 || ttSecV > 0) && (distanceV > 0)){
			totalPace = ttConv/distanceV;
			answer = timeConv(totalPace);
			paceList.slideUp();
			divPace.append("<h4>"+answer+"</h4>");
		}
		else if((paceHourV > 0 || paceMinV > 0 || paceSecV > 0) && (ttHourV > 0 || ttMinV > 0 || ttSecV > 0)){
			totalDistance = (ttConv/paceConv).toFixed(2);
			distList.slideUp();
			divDistance.append("<h4>"+totalDistance+" m/km</h4>");
		}
		else{
			alert("You are missing some data, please enter info in at least two categories.")
		}
	});
	
	$("#resetButton").on("click", function(){
			var info = $(".info");
   			var paceList = $("#pace-list");
			var distList = $("#dist-list");
			var ttList = $("#tt-list");

			ttList.slideDown();
			paceList.slideDown();
			distList.slideDown();
			$("h4").fadeOut();
			info.val('');
	});
});