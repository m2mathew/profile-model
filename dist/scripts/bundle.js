(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {

	var url = "http://tiyfe.herokuapp.com/collections/mike_m_profile-model";

	displayUserInfo();

	var user = new UserModel();
	var App = Backbone.Router.extend({
		routes: {
			'': 'profile',
			'edit': 'edit'
		},
		profile: function profile() {
			$('.page').hide();
			$('#profile').show();
		},
		edit: function edit() {
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
	$('.form-horizontal').on('submit', function (e) {
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
		$.get(url, function (response) {
			$('.profile-usertitle-name').text(response[0].name);
			$('.profile-usertitle-job').text(response[0].role);
			$('.navbar-right .dropdown .dropdown-toggle').text(response[0].name);
			$('#name').val(response[0].name);
			$('#inputEmail3').val(response[0].email);
			$('#role').val(response[0].role);
		}, 'json');
	};

	// change user information
	function changeUserInfo() {
		$.post(url, {
			name: user.get('name'),
			email: user.get('email'),
			role: user.get('role'),
			password: user.get('password')
		}, function (response) {
			$('.profile-usertitle-name').text(response.name);
			$('.profile-usertitle-job').text(response.role);
			$('.navbar-right .dropdown .dropdown-toggle').text(response.name);
			$('#name').val(response.name);
			$('#inputEmail3').val(response.email);
			$('#role').val(response.role);
		}, 'json');
	};
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map