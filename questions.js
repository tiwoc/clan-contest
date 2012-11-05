// Configuration file, change the contents to your needs. The contents of this
// file are in the public domain.

// The number of rounds can be changed:
//  * add/remove questions in questions_rounds
//  * add/remove rows in answers_rounds
//  * add/remove entries in multiplicator

// The number of answers per question can be changed:
//  * add/remove entries in the correct row of answers_rounds

// The number of questions in the finals can be changed:
//  * add/remove rows in questions_finals
//  * add/remove rows in answers_finals

// The number of valid answers in the finals can be changed:
//  * add/remove entries in the correct row of answers_finals

// questions for rounds
var questions_rounds = [
	'Name something that one can have for breakfast',
	'Name an animal species that is kept as a pet',
	'Name something that sticks to a wall'
];

// answers to the questions for rounds
// format: dimension 1 = round, dimension 2 = question, dimension 3 = [answer, points]
var answers_rounds = [
	[
		['Cereals', 49],
		['Coffee', 22],
		['Bread', 15],
		['Tea', 7],
		['Hot chocolate', 4], 
		['Fresh fruits', 3]
	],[
		['Dog', 50],
		['Cat', 36],
		['Gold Fish', 7],
		['Parrot', 4],
		['Guinea pig', 3]
	],[
		['Poster', 34],
		['Sticker', 29],
		['Bubble gum', 19],
		['Hot glue', 10]
	]
];


// multiplicator for the points gained in a round
// format: indexed by round, value is multiplicator
var multiplicator = [1, 1, 2, 3];
		

// questions for finals
var questions_finals = [
	'Name a place where it\'s hot',
	'Name a well known sight in New York',
	'Name something that can be found in a pond',
	'Name something that can be shattered'
];


// answers to the questions for the finals	
// format: dimension 1 = question, dimension 2 = answer, dimension 3 = [answer, points]
// must have five questions
var answers_finals = [
	[
		['Sahara', 35],
		['Hawaii', 26],
		['Bahamas', 10],
		['Oven', 10],
		['Sauna', 9]
	],[
		['Statue of Liberty', 30],
		['Empire State Building', 31],
		['Central Park', 26],
		['Brooklyn Bridge', 9],
		['Chinatown', 3]
	],[
		['Water Lily', 37],
		['Carp', 24],
		['Water pump', 19],
		['Fountain', 12],
		['Stones', 8],
	],[
		['Vase', 29],
		['Glass', 28],
		['Economy', 16],
		['Building', 15],
		['Myth', 12],
	]
];


// timer duration for first and second player in finals, given in seconds
var timers = [20, 25];

