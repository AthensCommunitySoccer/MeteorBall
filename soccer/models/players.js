Players = new Meteor.Collection("players");

if (Meteor.isServer) {
  Meteor.methods({
    addPlayer: function(player) {
      player.userId = this.userId;

      // check() me later...
      return Players.insert(player);
   },
  });

	Meteor.publish("myPlayers", function(){
		return Players.find( {userId:this.userId} );
	});
}
