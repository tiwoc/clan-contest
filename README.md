# Clan Contest

The rules of this game mostly follow the rules of a
[well known TV show](http://en.wikipedia.org/wiki/Family_feud#Gameplay).

Clan Contest currently runs on browsers that support .ogg audio files
(Firefox, Chrome/Chromium, Opera). It does _not_ need an internet connection.
The game was developed and tested with Firefox.


## Instructions

You need a computer with two connected screens (e.g. internal laptop screen +
attached projector). Do _not_ use the clone mode; both screens must show
different pictures (extended desktop mode).

1. open index.html in your browser
2. click on "open game window"
3. move the game window to the projector
4. switch the game window to fullscreen mode (Firefox: press F11)


## License

* The _code_ of Clan Contest is made available under the GPLv3.
* The _sound effects_ are provided under a Creative Commons Attribution license.
  Read more on the specifics in `sfx/LICENSE.txt`.
* The _logo_ is in the public domain.


## Files and Folders

* `gfx/`: image files
* `lib/`: JS libraries
* `sfx/`: sound effects
* `style/`: CSS files

#### index.html
control window; open this to start the game

#### popup.html
game window; must be opened through the control window

#### questions.js
game configuration; edit this file to define answers, points and the like


## Developers

Changes in the game state are represented by associative arrays (key value
pairs) with the changed state variable name as key and its new value as value.

### Settings

<table>
<tr>
<th>Setting</th>
<th>Data Type</th>
<th>Description</th>
</tr>

<tr>
<td>teams.{0,1}.name</td>
<td>string</td>
<td>name of the given team (0 = left team, 1 = right team)</td>
</tr>

<tr>
<td>teams.{0,1}.points</td>
<td>int</td>
<td>total points of the given team</td>
</tr>

<tr>
<td>teams.{0,1}.misses</td>
<td>int</td>
<td>number of mistakes of the given team in the current round</td>
</tr>

<tr>
<td>screen</td>
<td>string</td>
<td>name of the shown screen (splash, rounds, finals)</td>
</tr>

<tr>
<td>round.id</td>
<td>int</td>
<td>current round index (0 to number of round - 1)</td>
</tr>

<tr>
<td>round.points</td>
<td>int</td>
<td>points gained in the current round until now</td>
</tr>

<tr>
<td>round.finished</td>
<td>bool</td>
<td>true when the current round was finished (winning team was selected)</td>
</tr>

<tr>
<td>round.answers_shown.[0..n_answers-1]</td>
<td>int</td>
<td>negative if the answer with the given index is not yet shown
zero or greater if the answer should be shown
The exact value denotes the current round (round index from which the game
window should take the answer).</td>
</tr>

<tr>
<td>finals.points</td>
<td>int</td>
<td>points gained in the finals until now</td>
</tr>

<tr>
<td>finals.answers.{0,1}.[0..n_questions-1].id</td>
<td>int/string</td>
<td>negative if the answer of the given player to the given question was not
yet given zero or greater if an answer was already given. The exact value
denotes the index into the array of correct answers for the given question.
If it is a string (check with typeof(...) == 'string'), contains the (wrong)
answer given.</td>
</tr>

<tr>
<td>finals.answers.{0,1}.[0..n_questions-1].answer_shown</td>
<td>bool</td>
<td>true when the answer of the given player to the given question should be
shown</td>
</tr>

<tr>
<td>finals.answers.{0,1}.[0..n_questions-1].points_shown</td>
<td>bool</td>
<td>true when the points for the answer of the given player to the given
question should be shown</td>
</tr>
</table>


### Event Handling

Event handling (in the control window) works as follows:

1. button is pressed, calls event handler using onclick
2. event handler determines neccesary changes to state variables
3. event handler puts all changes into an associative array and calls
   commit_changes()
4. commit_changes() distributes the changes to both the control and game views
   and saves the changes in the undo history
5. the views process the received information using a state_changer object and
   make the neccesary changes to their state

