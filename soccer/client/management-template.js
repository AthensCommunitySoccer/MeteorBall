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

  Template.updateProfileForm.events({
    'click button.btn.btn-default.acsprofilesubmit' : function(event) {
      var profile = new Object;

      profile.name = $("#acsprofilename").val();
      profile.street = $("#acsprofileaddress").val();
      profile.city = $("#acsprofilecity").val();
      profile.state = $("#acsprofilestate").val();
      profile.zip = $("#acsprofilezip").val();
      profile.dob = $("#acsprofiledob").val();
      profile.phone = $("#acsprofilephone").val();

      profile.membership = true;

      Meteor.call("updateUserProfile", profile, function(error, userId) {
        console.log('Successfully updated with id ' + userId);
      });

      return;
    }
  });
  
  Template.userMemerbship.events({
    'click button.btn.btn-danger.membership-button' : function(event) {
      console.log('button clicked');
      Session.set("acsprofileform",true);
    }
  });

  Template.userProfilePanel.showmemForm = function() {
    return Session.get("acsprofileform");
  };

  Template.management.showManagementDrawer = function() {
    return Session.get("showManagementDrawer");
  };

  Template.addPlayerForm.showAdultPlayer = function() {
    return Session.get("acsAdultPlayer");
  }

  Template.addPlayerForm.showYouthPlayer = function() {
    return Session.get("acsYouthPlayer");
  }

}
