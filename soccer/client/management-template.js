if (Meteor.isClient) {
  Meteor.startup( function(){
    Session.set("acsAdultPlayer", false);
    Session.set("acsYouthPlayer", false);
  });

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

  Template.userMembership.events({
    'click button.btn.btn-danger.membership-button' : function(event) {
      console.log('button clicked');
      Session.set("acsprofileform",true);
    }
  });

  Template.addPlayerPanel.events({
    'click button.add-adult' : function(event) {
      Session.set("acsAdultPlayer",!Session.get("acsAdultPlayer"));
    }
  });

  Template.addPlayerPanel.events({
    'click button.add-youth' : function(event) {
      Session.set("acsYouthPlayer",!Session.get("acsYouthPlayer"));
    }
  });

  Template.userProfilePanel.showmemForm = function() {
    return Session.get("acsprofileform");
  };

  Template.management.showManagementDrawer = function() {
    return Session.get("showManagementDrawer");
  };

  Template.management.showAddPlayerForm = function() {
    return Session.get("acsAdultPlayer") || Session.get("acsYouthPlayer");
  }

  Template.addPlayerForm.events({
    'click button.acsPlayerSubmit' : function(event) {
      var playerProfile = new Object;

      playerProfile.name = $("#acsPlayerName").val();
      playerProfile.dateOfBirth = $("#acsPlayerDOB").val();
      playerProfile.emergencyContact = $("#acsPlayerEmergencyContact").val();
      playerProfile.emergencyPhone = $("#acsPlayerEmergencyPhone").val();
      playerProfile.medicalConditions = $("#acsPlayerMedical").val();
      playerProfile.youth = !!Session.get("acsYouthPlayer");

      Meteor.call("addPlayer", playerProfile, function(error, playerId) {
        console.log('Successfully addedPlayer with id' + playerId);
        Session.set("acsAdultPlayer", false);
        Session.set("acsYouthPlayer", false);
      });
    }
  });
}
