
// 'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('HomeController', function($scope, ParseFeedService) {
    
    $scope.selectedFeed;
    $scope.setSelectedFeed = function(feed) {
      $scope.selectedFeed = feed;
    };

    $scope.isSelected = function(feed) {
      if($scope.selectedFeed){
        return $scope.selectedFeed === feed;
      }
    };

    $scope.loadFeed = function(){
      ParseFeedService.parseFeed($scope.feed).then(function(res){
          $scope.feeds=res.data.responseData.feed.entries;
      });
    };
  })

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
       console.log($scope.showingReply);
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

    $scope.feeds = [];
      GetFeedService.getFeeds().success(function(data){
        $scope.feeds=data;
        console.log($scope.feeds);
    });

    $scope.selectFeed = function (id) {
      $scope.feedSrc = $scope.feeds[id].url;
      $scope.titleText = $scope.feeds[id].name;
      $scope.loadFeed();
    };

    $scope.feedomatic;
    $scope.loadFeed = function(){
        ParseFeedService.parseFeed($scope.feedSrc).then(function(res){
            $scope.feedomatic=res.data.responseData.feed.entries;
        });
    };

    $scope.submitFeed = function (newFeed) {
      console.log(newFeed);
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