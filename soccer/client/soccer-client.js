EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set("acsAccountOK", false);
    Session.set("acsAccountFAIL", false);
    Session.set("showBadEmail", false);
    Session.set("showBadPass", false);
    Session.set("loginBadEmail", false);
    Session.set("acsLoginFAIL", false);
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

  Template.userSigninForm.events({
    'click button.btn.btn-default.login-button' : function(event) {
      event.preventDefault();
      acslogin = new Object();
      var trimInput = function(val) {
        return val.replace(/^\s*|\s*$/g,"");
      }
      var isValidPassword = function(val) {
        return val.length >= 6 ? true : false;
      }

      console.log('login attempt detect');

      acslogin.email = document.getElementById("login-email").value;
      acslogin.pass = document.getElementById("login-password").value;

      acslogin.email = trimInput(acslogin.email);

      if (EMAIL_REGEX.test(acslogin.email)) {
        Session.set("loginBadEmail", false);
        Session.set("acsLoginFAIL", false);
        Meteor.loginWithPassword(acslogin.email, acslogin.pass, function(err) {
          if (err) {
            Session.set("acsLoginFAIL", true);
          } else {
            Session.set("acsLoginFAIL", false);
          }
        });
      } else {
        Session.set("loginBadEmail", true);
      }
    }
  });

  Template.userSigninForm.loginBadEmail = function() {
    return Session.get("loginBadEmail");
  };

  Template.userSigninForm.attemptLoginFAIL = function() {
    return Session.get("acsLoginFAIL");
  };

  Template.newUserSignUp.events({
    'click button.btn.btn-default.acssignupsubmit' : function(event) {
      event.preventDefault();

      var trimInput = function(val) {
        return val.replace(/^\s*|\s*$/g,"");
      }
      var isValidPassword = function(val) {
        return val.length >= 6 ? true : false;
      }

      var profile = new Object();

      profile.name = $("#acssignup").val();
      profile.email = trimInput($("#acssignupemail").val());
      profile.pass =  $("#acssignuppass").val();

      if (EMAIL_REGEX.test(profile.email)) {
        Session.set("showBadEmail", false);
        if (isValidPassword(profile.pass)) {
          Session.set("showBadPass", false);

          Accounts.createUser({username: profile.email, email: profile.email, password: profile.pass, profile: { name: profile.name }}, function(error, result){
            if (error) {
              Session.set("acsAccountFAIL", true);
              Session.set("acsAccountOK", false);
            } else {
              Session.set("acsAccountOK", true);
              Session.set("acsAccountFAIL", false);
              $("#acssignup").val("");
              $("#acssignemail").val("");
              $("#acssignpass").val("");
            }
          });
        } else {
          Session.set("showBadPass", true);
          Session.set("acsAccountFAIL", false);
          Session.set("acsAccountOK", false);
        }
      } else {
        Session.set("showBadEmail",true);
        Session.set("showBadPass",false);
        Session.set("acsAccountFAIL", false);
        Session.set("acsAccountOK", false);
      }
    }
  });

  Template.newUserSignUp.showBadEmail = function() {
    return Session.get("showBadEmail");
  };

  Template.newUserSignUp.showBadPass = function() {
    return Session.get("showBadPass");
  };

  Template.newUserSignUp.showAccountFail = function() {
    return Session.get("acsAccountFAIL");
  };

  Template.newUserSignUp.showAccountOK = function() {
    return Session.get("acsAccountOK");
  };

  Template.newUserSignUp.showAccountOK = function() {
    return Session.get("acsAccountOK");
  };

  Template.userProfilePanel.showCreateTeam = function() {
    return Session.get("acsCreateTeam");
  };


  Template.leagueRequest.events ({
    'click button.btn.btn-default.acssubmitteam' : function(event) {
      console.log('submit button clicked');
      Session.set("acsCreateTeam",false);
    }
    });

  Template.addTeam.events ({
    'click button.btn.btn-default.acsaddteam' : function(event) {
      console.log('new button clicked');
      Session.set("acsCreateTeam",true);
    }
  });

}
