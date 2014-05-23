if (Meteor.isServer) {
	Players = new Meteor.Collection("players");
  
  Meteor.methods({
    addPlayer: function(player) {
      player.userId = Meteor.user()._id;
      
      // check() me later...
      return Players.insert(player);
   },
  });
}