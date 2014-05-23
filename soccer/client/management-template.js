if (Meteor.isClient) {
  Template.management.events({
    'click #username' : function(event) {
      Session.set("showManagementDrawer", !Session.get("showManagementDrawer"));

      return;
    },

    'click button.btn.btn-default.logout-button' : function(event) {
      event.preventDefault();

      Session.set("showManagementDrawer", false);

      Meteor.logout(function(err) {
        if (err) {
          // handle logout error
        }
      });
    }
  });



  Template.management.showManagementDrawer = function() {
    return Session.get("showManagementDrawer");
  };
}
