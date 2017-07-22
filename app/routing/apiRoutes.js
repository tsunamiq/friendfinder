var friends = require("../data/friends.js");

module.exports = function(app){
	app.get("/api/friends", function(req,res){
		res.json(friends)
		console.log("api friends printed.")
	})

	app.post("/api/friend", function(req,res){
		var scoreDifference = 51;
		var commonFriend = {};

		// calculating total score of new surver
		var newSurveryScore = req.body.score 
		console.log("new survery score array: " + newSurveryScore)
		
		var newSurveryScoreSum = req.body.score.reduce(sum,0)
		console.log("reduced new survey score: "+ newSurveryScoreSum)
		

		// looping through friends array, calculating score and comparing to new survey
		for(var i = 0 ; i < friends.length  ; i++){
			var friendScoreSum = friends[i].score.reduce(sum,0);
			var scoreCalc = Math.abs(newSurveryScoreSum - friendScoreSum)

			console.log("score calculation & friendScoreSum: " + scoreCalc + " // " + friendScoreSum);
			if(scoreCalc < scoreDifference){
				scoreDifference = scoreCalc; 
				commonFriend = friends[i]
			}
		}
		
		friends.push(req.body);

		console.log("api friends added.")
		console.log("common friend: " +  JSON.stringify(commonFriend))
		res.json(commonFriend);

		// sum function for reduce
		function sum(sum,num){
			return sum + parseInt(num);
		}
	})
}