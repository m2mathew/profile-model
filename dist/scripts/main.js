'use strict';

$(document).ready(function() {

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

	$('.form-horizontal').on('submit', function(e) {
		e.preventDefault();

		var userName = $('#name').val();
		var userEmail = $('#inputEmail3').val();
		var userRole = $('#role').val();

		user.set( {name: userName, email: userEmail, role: userRole } );
	});

	user.on('change', function () {

		var userName = $('#name').val();
		var userEmail = $('#inputEmail3').val();
		var userRole = $('#role').val();

		$('.profile-usertitle-name').text(userName);
		$('.profile-usertitle-job').text(userRole);
		$('.navbar-right .dropdown .dropdown-toggle').html(userName + ' <span class="caret"></span>');
	});


});
