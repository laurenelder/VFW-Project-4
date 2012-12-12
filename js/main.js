// Devin "Lauren" Elder
// VFW Term 1212
// Project 3
// 12/6/2012

window.addEventListener("DOMContentLoaded", function() {

// Shortcut Function
	var $ = function(x) {
		var theElement = document.getElementById(x);
		return theElement;
	};

// Radio Button Functions
	var getRadioGender = function() {
		var radioOne = document.forms[0].gender;
		for (var i = 0; i < radioOne.length; i++) {
			if (radioOne[i].checked) {
				genderValue = radioOne[i].value;
			}
		};
	};
	var getRadioOrientation = function() {
		var radioTwo = document.forms[0].orientation;
		for (var i = 0; i < radioTwo.length; i++) {
			if (radioTwo[i].checked) {
				orientationValue = radioTwo[i].value;
			}
		};
	};

// Check Box Function
	getCheckBoxValue = function() {
		if ($("vehicle").checked) {
			vehicleValue = "Yes";
		} else {
			vehicleValue = "No"
		}
		if ($("shared_interests").checked) {
			interestsValue = "Yes";
		} else {
			interestsValue = "No";
		}
		if ($("financially_stable").checked) {
			stableValue = "Yes";
		} else {
			stableValue = "No";
		}
		if ($("drinks").checked) {
			drinksValue = "Yes";
		} else {
			drinksValue = "No";
		}
		if ($("smokes").checked) {
			smokesValue = "Yes";
		} else {
			smokesValue = "No";
		}
		if ($("has_kids").checked) {
			hasKidsValue = "Yes";
		} else {
			hasKidsValue = "No";
		}
		if ($("wants_kids").checked) {
			wantsKidsValue = "Yes";
		} else {
			wantsKidsValue = "No";
		}
		if ($("has_pets").checked) {
			hasPetsValue = "Yes";
		} else {
			hasPetsValue = "No";
		}
	};

// Toggle links Function
	var toggleLinks = function(n) {
		switch(n) {
			case "on":
				$("errors").style.display = "none";
				$("addUserForm").style.display = "none";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("Add_a_User").style.display = "inline";
				break;
			case "off":
				$("errors").style.display = "block";
				$("addUserForm").style.display = "inline";
				$("clear").style.display = "inline";
				$("display").style.display = "inline";
				$("Add_a_User").style.display = "inline";
				$("item").style.display = "none";
				break;
			default:
				return false;
		};
	};

// Get Data Function
	var getData	= function() {
		if (window.localStorage.length === 0) {
			alert("There is no data in local storage so default data has been entered.");
			autoFillData();
		}
		toggleLinks("on");
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "item");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("item").style.display = "block";
		for (var i = 0, j = window.localStorage.length; i < j; i++) {
			var makeLi = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = window.localStorage.key(i);
			var value = window.localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			getImage(obj.gender[1], obj.orientation[1], makeSubList);
			for(var n in obj) {
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0] + " " + obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi)
			};
		makeItemLinks(window.localStorage.key(i), linksLi);
		};
	};

// Get Image Function
var getImage = function(genderType, oValue, makeSubList) {
	var imageLi = document.createElement("li");
	makeSubList.appendChild(imageLi);
	var newImgOne = document.createElement("img");
	var newImgTwo = document.createElement("img");
	var setSrcOne = newImgOne.setAttribute("src", "../img/" + genderType + ".png");
	if (oValue === "Straight") {
		var setSrcTwo = newImgTwo.setAttribute("src", "../img/Straight.png");
	}
	if (oValue === "Bisexual") {
		var setSrcTwo = newImgTwo.setAttribute("src", "../img/Bisexual.png");
	}
	if (oValue === "Gay" && genderType === "Male") {
		var setSrcTwo = newImgTwo.setAttribute("src", "../img/gayMale.png");
	}
	if (oValue === "Gay" && genderType === "Female") {
		var setSrcTwo = newImgTwo.setAttribute("src", "../img/gayFemale.png");
	}
	imageLi.appendChild(newImgOne);
	imageLi.appendChild(newImgTwo);
};

// Auto Fill Data Function
	var autoFillData = function() {
		for (var n in json) {
			var id = Math.floor(Math.random() * 1000001);
			window.localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};

// Make Links Function
	var makeItemLinks = function(key, linksLi) {

		// Edit Link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit User"
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		// Break Tag
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);

		// Delete Link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete User"
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};

// Store Data Function
	var	storeData = function(key) {
		if (!key) {
			var id				= Math.floor(Math.random() * 1000001);
		} else {
			id = key;
		}
		getRadioGender();
		getRadioOrientation();
		getCheckBoxValue();
		var item				= {};
			item.userName		= ["Username: ", $("uname").value];
			item.age			= ["Age: ", $("age").value];
			item.city			= ["City: ", $("city").value];
			item.website		= ["Dating Website: ", $("wsite").value];
			item.contacted		= ["First Contacted: ", $("fcontact").value];
			item.gender			= ["Gender: ", genderValue];
			item.orientation	= ["Sexual Orientation: ", orientationValue];
			item.vehicle		= ["Has a Vehicle: ", vehicleValue];
			item.interests		= ["Has Shared Interests: ", interestsValue];
			item.stable			= ["Is Financially Stable: ", stableValue];
			item.drinks			= ["Drinks: ", drinksValue];
			item.smokes			= ["Smokes: ", smokesValue];
			item.hasKids		= ["Has Kids: ", hasKidsValue];
			item.wantsKids		= ["Wants Kids: ", wantsKidsValue];
			item.hasPets		= ["Has Pets: ", hasPetsValue];
			item.music			= ["Favorite Music Genre: ", $("music").value];
			item.movie			= ["Favorite Movie Genre: ", $("movie").value];
			item.compatible		= ["Level of Compatibility: ", $("compatibility").value];
			item.notes			= ["Additional Information: ", $("comments").value];
		
		window.localStorage.setItem(id, JSON.stringify(item));
		alert("User Saved!");
	};

// Edit Item Function
	var editItem = function() {
		var value = window.localStorage.getItem(this.key);
		var item = JSON.parse(value);

		// Show Form
		toggleLinks("off");
		$("display").style.display = "none";

		$("uname").value = item.userName[1];
		$("age").value = item.age[1];
		$("city").value = item.city[1];
		$("wsite").value = item.website[1];
		$("fcontact").value = item.contacted[1];
		var radioOne = document.forms[0].gender;
		for (var i = 0; i < radioOne.length; i++) {
			if (radioOne[i].value == "Male" && item.gender[1] == "Male") {
				radioOne[i].setAttribute("checked", "checked");
			} else if (radioOne[i].value == "Female" && item.gender[1] == "Female") {
				radioOne[i].setAttribute("checked", "checked");
			}
		};
		var radioTwo = document.forms[0].orientation;
		for (var i = 0; i < radioTwo.length; i++) {
			if (radioTwo[i].value == "Straight" && item.orientation[1] == "Straight") {
				radioTwo[i].setAttribute("checked", "checked");
			} else if (radioTwo[i].value == "Bisexual" && item.orientation[1] == "Bisexual") {
				radioTwo[i].setAttribute("checked", "checked");
			} else if (radioTwo[i].value == "Gay" && item.orientation[1] == "Gay") {
				radioTwo[i].setAttribute("checked", "checked");
			}
		};
		if (item.vehicle[1] == "Yes") {
			$("vehicle").setAttribute("checked", "checked");
		}
		if (item.interests[1] == "Yes") {
			$("shared_interests").setAttribute("checked", "checked");
		}
		if (item.stable[1] == "Yes") {
			$("financially_stable").setAttribute("checked", "checked");
		}
		if (item.drinks[1] == "Yes") {
			$("drinks").setAttribute("checked", "checked");
		}
		if (item.smokes[1] == "Yes") {
			$("smokes").setAttribute("checked", "checked");
		}
		if (item.hasKids[1] == "Yes") {
			$("has_kids").setAttribute("checked", "checked");
		}
		if (item.wantsKids[1] == "Yes") {
			$("wants_kids").setAttribute("checked", "checked");
		}
		if (item.hasPets[1] == "Yes") {
			$("has_pets").setAttribute("checked", "checked");
		}
		$("music").value = item.music[1];
		$("movie").value = item.movie[1];
		$("compatibility").value = item.compatible[1];
		$("comments").value = item.notes[1];
		save.removeEventListener("click", validate);
		$("submit").value = "Edit User";
		var editSubmit = $("submit");
		editSubmit.value = "Edit User";
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	};

// Validate Function
	var validate = function(e) {
		var getUname = $("uname");
		var getAge = $("age");
		var getCity = $("city");
		var getWsite = $("wsite");
		var getFcontact = $("fcontact");
		var getMusic = $("music");
		var getMovie = $("movie");
		var getCompatibility = $("compatibility");
		var getComments = $("comments");

		// Reset Messages
		errMsg.innerHTML = "";
		getUname.style.border = "1px solid black";
		getAge.style.border = "1px solid black";
		getCity.style.border = "1px solid black";
		getWsite.style.border = "1px solid black";
		getFcontact.style.border = "1px solid black";

		
		var msgArry = [];

		// Username Verification
		if ($("uname").value === "") {
			var unameError = "Please enter a username.";
			getUname.style.border = "1px solid red";
			msgArry.push(unameError);
		}

		// Age Verification
		if ($("age").value === "") {
			var ageError = "Please enter a age for the user.";
			getAge.style.border = "1px solid red";
			msgArry.push(ageError);
		}
		
		// City Verification
		if ($("city").value === "") {
			var cityError = "Please enter a city for the user.";
			getCity.style.border = "1px solid red";
			msgArry.push(cityError);
		}

		// Website Verification
		var re = /^\w+(\.\w{2,3})+$/;
		if (!(re.exec(getWsite.value))) {
			var wsiteError = "Please enter a website the user is located on.";
			getWsite.style.border = "1px solid red";
			msgArry.push(wsiteError);
		}

		// Display Error Messages
		if (msgArry.length >= 1) {
			for (var i = 0, j = msgArry.length; i < j; i++) {
				var errTxt = document.createElement("li");
				errTxt.innerHTML = msgArry[i];
				errTxt.style.color = "red";
				errMsg.appendChild(errTxt);
			};
		} else {
			storeData(this.key);
			window.location.reload($("Add_a_User"));
		}
		e.preventDefault();
		return false;
	};

// Delete Item Function
	var deleteItem = function() {
		var ask = confirm("Are you sure you want to delete this user?");
		if (ask) {
			window.localStorage.removeItem(this.key);
			alert("User has been deleted.");
			window.location.reload();
		} else {
			alert("User was not deleted.");
		}
	};

// Clear Data Function
	var clearLocal = function() {
			window.localStorage.clear();
			alert("All users deleted.");
			window.location.reload();
			return false;	
	};

// Delete users confirm function
	var confirmDelete = function() {
		if (window.localStorage.length === 0) {
			alert("There is no data to clear.");
		} else {
			var ask = confirm("Delete all users?");
			if (ask) {
				clearLocal();
			} else {
				alert("Users not deleted.");
			}
		}
	};

// Variable Defaults
	var errMsg = $("errors");

// Event Listeners
	var displayLink = $("display");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", confirmDelete);
	var save = $("submit");
	save.addEventListener("click", validate);
});