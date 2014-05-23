if (Meteor.isServer) {
  Houston.add_collection(Meteor.users)
  Houston.add_collection(Players)
  Houston.add_collection(Leagues)
  Houston.add_collection(Seasons)
  Houston.add_collection(Teams)
  Houston.add_collection(TeamMemberships)
}