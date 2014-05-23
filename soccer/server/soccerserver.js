if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({

	playerAdd: function(acsplayer) {
	  var playerID = Player.insert({
		'name' : acsplayer.name,
		'address' : acsplayer.address,
		'city' : acsplayer.city,
		'state' : acsplayer.state,
		'zip' : acsplayer.zip,
		'age' : acsplayer.age,
		'gender' : acsplayer.gender,
		'phone' : acsplayer.phone,
		'cell' : acsplayer.cell,
		'emcontact' : acsplayer.emcontact,
		'emphone' : acsplayer.emphone,
		'medical' : acsplayer.medical,
		'created' : new Date()
	  });
	  return playerID;
	},

	acsProfileFn: function(acsprofile) {
	   var profileID = 0;

	   Meteor.users.update(Meteor.userId(), {$set:{"profile.street": acsprofile.street}});
	   Meteor.users.update(Meteor.userId(), {$set:{"profile.city": acsprofile.city}});
	   Meteor.users.update(Meteor.userId(), {$set:{"profile.state": acsprofile.state}});


	   return profileID;
	}
  });

}
