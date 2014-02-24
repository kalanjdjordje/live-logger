/**
 * New node file
 */

var phonecatApp = angular.module('LiveLogger', []);

phonecatApp.controller('LogsCtrl', function($scope) {
	$scope.logs = []; 
	$scope.categories = {}; 
	$scope.levels = {}; 

	var socket = io.connect('http://localhost');
	socket.on('log', function (log) {
		if($scope.categories[log.category]== undefined)
			$scope.categories[log.category] = [];
		if($scope.levels[log.level]==undefined)
			$scope.levels[log.level]=[];

		$scope.categories[log.category].push(log);
		$scope.levels[log.level].push(log);
		$scope.logs.push(log);
		console.log(log);
		console.log($scope.categories);
		$scope.$apply();
		});	

	$scope.formatDate = function(time){
		var date = new Date(time);
		return twoDigit(date.getHours())+":"+twoDigit(date.getMinutes())+":"+twoDigit(date.getSeconds());
	};
	function twoDigit(n){
	    return n > 9 ? "" + n: "0" + n;
	}
	$scope.getColor = function(level){
		switch(level){
		case'error': return 'red';
		case'fatal': return 'red';
		case'wtf': return 'red';
		case'info': return 'white';
		case'trace': return 'silver';
		case'debug': return 'blue';
		case'warn': return 'orange';
		default: return 'green';
		}
	};
	
  $scope.orderProp = 'age';
});