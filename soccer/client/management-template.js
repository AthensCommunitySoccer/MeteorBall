if (Meteor.isClient) {
  Template.management.events({
    'click #username' : function(event) {
      Session.set("showManagementDrawer", !Session.get("showManagementDrawer"));

      return;
    }

  });

  Template.management.showManagementDrawer = function() {
    return Session.get("showManagementDrawer");
  };
}
