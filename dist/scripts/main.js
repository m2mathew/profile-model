'use strict';

$(document).ready(function() {

	var url = "http://tiyfe.herokuapp.com/collections/mike_m_profile-model";

	displayUserInfo();

	var user = new UserModel();
	var App = Backbone.Router.extend({
		routes: {
			'': 'profile',
			'edit': 'edit'
		},
		profile: function() {
			$('.page').hide();
			$('#profile').show();
		},
		edit: function() {
			$('.page').hide();
			$('#edit').show();
		}
	});

	$('#name').val(user.get('name'));
	$('#inputEmail3').val(user.get('email'));
	$('#role').val(user.get('role'));

	var app = new App();
	Backbone.history.start();

	// save button function
	$('.form-horizontal').on('submit', function(e) {
		e.preventDefault();

		var userName = $('#name').val();
		var userEmail = $('#inputEmail3').val();
		var userRole = $('#role').val();
		var userPassword = $('#inputPassword3').val();

		user.set({
			name: userName,
			email: userEmail,
			role: userRole,
			password: userPassword
		});
	});

	// listen for change on the page
	user.on('change', function () {
		changeUserInfo();
	});

	// display user information
    function displayUserInfo() {
        $.get(
            url,
            function(response){
                $('.profile-usertitle-name').text(response[0].name);
				$('.profile-usertitle-job').text(response[0].role);
				$('.navbar-right .dropdown .dropdown-toggle').text(response[0].name);
				$('#name').val(response[0].name);
				$('#inputEmail3').val(response[0].email);
				$('#role').val(response[0].role);
            },
            'json'
    )};

    // change user information
    function changeUserInfo() {
    	$.post(
    		url,
    		{
    			name: user.get('name'),
    			email: user.get('email'),
    			role: user.get('role'),
    			password: user.get('password')
    		},
    		function(response) {
    			$('.profile-usertitle-name').text(response.name);
				$('.profile-usertitle-job').text(response.role);
				$('.navbar-right .dropdown .dropdown-toggle').text(response.name);
				$('#name').val(response.name);
				$('#inputEmail3').val(response.email);
				$('#role').val(response.role);
    		},
    		'json'
    )};
});
