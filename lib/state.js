/*
 * Copyright 2011 Daniel Seither (post@tiwoc.de)
 * 
 * This file is part of Clan Contest.
 * 
 * Clan Contest is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Clan Contest is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Clan Contest.  If not, see http://www.gnu.org/licenses/.
 */

// State
// 
// Handles changes to a set of state variables, providing undo/redo.

// convention: elements starting with an underscore should not be used from outside the containing object

// Constructor for State objects
// parameter: function to be called with the changes to be distributed to the change receivers
//
// Please note:
//  * If undo/redo listeners should be used, these must be registered before any other use of the object.
//  * After creating a State object and before using it normally, submit initial state using commit_changes, writing to all state variables.
function State(publish_changes) {
	// undo/redo data
	this._history = [];
	this._future = [];
	
	// undo/redo listeners
	this._undo_listener = function(can_undo) {};
	this._redo_listener = function(can_redo) {};
	
	// function to be called when changes should be effected
	this._publish_changes = publish_changes;
}

// entry point for changelists; call this to do changes
State.prototype.commit_changes = function(changes) {
	this._future = [];
	this._history.push(changes);
	this._publish_changes(changes);

	// nothing can be redone since a new change is committed
	this._redo_listener(false);

	// enable undo if something other than the initial state is left to be undone
	this._undo_listener(this._history.length > 1);
}

// undo last change
State.prototype.undo = function() {

	// undo latest change
	var changes = this._history.pop();
	this._future.push(changes);
	this._publish_changes(this.get_consolidated());

	// undone change can be redone
	this._redo_listener(true);
	
	// enable undo if something other than the initial state is left to be undone
	this._undo_listener(this._history.length > 1);
}

// redo latest undone change
State.prototype.redo = function() {

	// re-publish changes
	var changes = this._future.pop();
	this._history.push(changes);
	this._publish_changes(changes);
	
	// enable redo if something is left to be redone
	this._redo_listener((this._future.length > 0));
	
	// enable undo
	this._undo_listener(true);
}

// the given function is called to update the undo state (can undo [y/n])
State.prototype.set_undo_listener = function(listener) {
	this._undo_listener = listener;
}

// the given function is called to update the redo state (can redo [y/n])
State.prototype.set_redo_listener = function(listener) {
	this._redo_listener = listener;
}

// use the history of changes to calculate the current state of each setting
State.prototype.get_consolidated = function() {
	var consolidated = {}
	
	// replay all changes chronologically, letting newer entries overwrite older entries of the same setting
	$.each(this._history, function(idx, changes) {
		$.each(changes, function(setting, value) {
			consolidated[setting] = value;
		});
	});
	
	return consolidated;
}

