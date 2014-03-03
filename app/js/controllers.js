// 'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('HomeController', function($scope) {
    $scope.selectedThing;
    $scope.setSelectedThing = function(stuff) {
      $scope.selectedThing = stuff;
    };

    $scope.isSelected = function(stuff) {
      if($scope.selectedThing){
        return $scope.selectedThing === stuff;
      }
    };

  })

  .controller('ListingController', function($scope, $http) {
    $http.get('/config/data.json')
     .then(function(res){
        $scope.thing = res.data;
      });
  })

  .controller('ContentController', function($scope, $http) {
    $scope.showingReply = false;

    $scope.showReply = function () {
      $scope.showingReply = true;
    };

  })

  .controller('SettingsController', function($scope) {
    $scope.settings = {
      name: "Steve",
      email: "me@example.com",
      age: 24
    };
    $scope.updateSettings = function() {
      console.log("updateSettings was called");
    };
  })


  .controller('ContactController', function ($scope, ContactService) {
 
    $scope.contacts = ContactService.list();
 
    $scope.saveContact = function () {
        ContactService.save($scope.newcontact);
        $scope.newcontact = {};
    };
 
    $scope.delete = function (id) {
 
        ContactService.delete(id);
        if ($scope.newcontact.id == id) $scope.newcontact = {};
    };
 
    $scope.edit = function (id) {
        $scope.newcontact = angular.copy(ContactService.get(id));
    };
  });