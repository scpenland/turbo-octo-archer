
// 'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('HomeController', function($scope) {

    $scope.selectedFeed;
    $scope.setSelectedFeed = function(feed) {
      $scope.selectedFeed = feed;
      console.log("$scope.selectedFeed");
    };

    $scope.isSelected = function(feed) {
      if($scope.selectedFeed){
        return $scope.selectedFeed === feed;
      }
    };
  })

  // .controller('ListingController', function($scope, $http) {
  //   $http.get('/config/data.json')
  //    .then(function(res){
  //       $scope.thing = res.data;
  //     });
  // })

  .controller('ListingController', function($scope, $http, GetFeedService, ParseFeedService) {
    $scope.feeds = [];
    GetFeedService.getFeeds().success(function(data){
      $scope.feeds=data;
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

  .controller("FeedsController", ['$scope','ParseFeedService', 'GetFeedService', function ($scope, ParseFeedService, GetFeedService) {

    $scope.importedFeeds = [];
      GetFeedService.getFeeds().success(function(data){
        $scope.importedFeeds = data;
        console.log($scope.importedFeeds);
    });

    $scope.selectFeed = function (id) {
      $scope.feedSrc = $scope.importedFeeds[id].url;
      $scope.titleText = $scope.importedFeeds[id].name;
      $scope.loadFeed();
    };

    $scope.loadFeed = function(){
        ParseFeedService.parseFeed($scope.feedSrc).then(function(res){
            $scope.feeds=res.data.responseData.feed.entries;
        });
    };

    $scope.submitFeed = function() {

      /*$http.post('/config/feeds.json', $scope.languages).then(function(data) {
        $scope.msg = 'Data saved';
      });*/
      $scope.msg = $scope.test;
      console.log($scope.msg);
    };

  }])


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