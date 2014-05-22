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

  Template.dashmmem.events({
     'click button.btn.btn-default.acsmemsubmit' : function(event) {
	var acsprofile = new Object;

	acsprofile.name = document.getElementById("acsmemname").value;
	acsprofile.street = document.getElementById("acsmemaddress").value;
	acsprofile.city = document.getElementById("acsmemcity").value;
	acsprofile.state = document.getElementById("acsmemstate").value;
	acsprofile.zip = document.getElementById("acsmemzip").value;
	acsprofile.age = document.getElementById("acsmemage").value;
	acsprofile.phone = document.getElementById("acsmemphone").value;
	acsprofile.emcontact = document.getElementById("acsmememcontact").value;
	acsprofile.emphone = document.getElementById("acsmememconphone").value;
	acsprofile.medical = document.getElementById("acsmemmedical").value;
	acsprofile.membership = true;

	console.log(acsprofile.emcontact);

	Meteor.call("acsProfileFn",acsprofile,function(error, sresID) {
		console.log('Successfully updated with id '+sredID);
	});

	return;

      }
  });

  Template.dashmem.events({
     'click button.btn.btn-danger.membership-button' : function(event) {
	console.log('button clicked');
	Session.set("acsmemform",true);
      }
  });

  Template.dashside.showmemForm = function() {
        return Session.get("acsmemform");
  };


  Template.dashhead.events({
     'click button.btn.btn-default.logout-button' : function(event) {
        event.preventDefault();
        Meteor.logout(function(err) {   
          if (err) {
          } 
        });
      }
  });


  Template.existing.events({
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

  Template.existing.loginBadEmail = function() {
        return Session.get("loginBadEmail");
  };

  Template.existing.attemptLoginFAIL = function() {
        return Session.get("acsLoginFAIL");
  };

  Template.newuser.events({
    'click button.btn.btn-default.acssignupsubmit' : function(event) {
        event.preventDefault();
	var acsnew = new Object();
	var acsprofile = new Object();
	var trimInput = function(val) {
		return val.replace(/^\s*|\s*$/g,"");
	}
	var isValidPassword = function(val) {
		return val.length >= 6 ? true : false;
	}

	acsnew.name = document.getElementById("acssignup").value;
	acsnew.email = document.getElementById("acssignupemail").value;
	acsnew.pass = document.getElementById("acssignuppass").value;

	acsnew.email = trimInput(acsnew.email);

	acsprofile.name = acsnew.name;
	acsprofile.email = acsnew.email;
	acsprofile.street = "";

	if (EMAIL_REGEX.test(acsnew.email)) {
		Session.set("showBadEmail",false);
		if (isValidPassword(acsnew.pass)) {
		    Session.set("showBadPass",false);
		    Accounts.createUser({email: acsnew.email, password: acsnew.pass, profile: acsprofile}, function(err) {
		    	if (err) {
			    Session.set("acsAccountFAIL", true);
			    Session.set("acsAccountOK", false);
		    	} else {
			    Session.set("acsAccountOK", true);
			    Session.set("acsAccountFAIL", false);
			    document.getElementById("acssignup").value = "";
			    document.getElementById("acssignemail").value = "";
			    document.getElementById("acssignpass").value = "";
		        }
		    });
		} else {
		    Session.set("showBadPass", true);
		    Session.set("acsAccountFAIL", false);
		    Session.set("acsAccountOK", false);
		}
	} else {
		console.log('bad email');
		Session.set("showBadEmail",true);
		Session.set("showBadPass",false);
		Session.set("acsAccountFAIL", false);
		Session.set("acsAccountOK", false);
	}
     }
  });

  Template.newuser.showBadEmail = function() {
        return Session.get("showBadEmail");
  };

  Template.newuser.showBadPass = function() {
        return Session.get("showBadPass");
  };

  Template.newuser.showAccountFail = function() {
        return Session.get("acsAccountFAIL");
  };

  Template.newuser.showAccountOK = function() {
        return Session.get("acsAccountOK");
  };

  Template.newuser.showAccountOK = function() {
        return Session.get("acsAccountOK");
  };

}
