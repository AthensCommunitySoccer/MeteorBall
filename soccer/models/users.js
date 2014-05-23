if (Meteor.isServer) {
  Meteor.methods({
    updateUserProfile: function(profile) {
      if (profile.name == "" || profile.name == null) {
        profile.name = Meteor.user().profile.name
      }
      
      // check() me later...
     return Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
   },
  });
}