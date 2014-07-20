Teams = new Meteor.Collection("teams");

if (Meteor.isServer) {
  Meteor.publish("myTeams", function(){
    return Teams.find({creatorId: this.userId});
  });

  Meteor.publish("allTeams", function(){
    return Teams.find({}, {fields: {name: 1}});
  });

  Meteor.methods({
    addTeam: function(team) {

      team.creatorId = this.userId;

      sameNameTeamCount = Teams.find({name: team.name}, {limit: 1}).count();


      if (sameNameTeamCount == 0) {
        teamId = Teams.insert(team);
        console.log(Teams.find().fetch());
        console.log(teamId);

        return teamId;
      }
   },
  });
}