
// 'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('HomeController', function($scope) {
    $scope.selectedFeed;
    $scope.setSelectedFeed = function(feed) {
      $scope.selectedFeed = feed;
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

    $scope.importedFeeds = [
      {id: 0, name: 'Huff', url: "http://feeds.huffingtonpost.com/huffingtonpost/raw_feed"},
      {id: 1, name: 'Tech', url: "http://feeds.feedburner.com/TechCrunch"},
      {id: 2, name: 'Yahoo', url: "http://news.ycombinator.com/rss"}
    ];

    // $scope.importedFeeds = [
    //   {id: 0, name: 'Huff', url: "http://feeds.huffingtonpost.com/huffingtonpost/raw_feed"},
    //   {id: 1, name: 'Tech', url: "http://feeds.feedburner.com/TechCrunch"},
    //   {id: 2, name: 'Yahoo', url: "http://news.ycombinator.com/rss"}
    // ];

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

    $scope.submitFeed = function () {

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