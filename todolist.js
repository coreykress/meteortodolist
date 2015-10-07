Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
	Template.body.helpers({
		tasks: function(){
			return Tasks.find({},{sort: {createdAt: -1}});
			}
		});


	Template.body.events({  //events in the body template can cause these things to occur
		
		//listen to the submit event that matches the css selector .new-task

		"submit .new-task": function(event){ //event has info about the event that happened
		
		//prevent default browser form submit i.e. keep browser from refreshing
		event.preventDefault();

		//get value from the form element so it can be inserted into collection
		var text= event.target.text.value;

		Tasks.insert({
		text: text,
		createdAt: new Date()
		});

		//clear the form
		event.target.text.value="";
			}
		});

	Template.task.events({
		"click .toggle-checked": function(){
		
		Tasks.update(this._id, {
			$set: {checked: ! this.checked}
			});
		},
		"click .delete": function() {
		Tasks.remove(this._id);
		}
		});
}
