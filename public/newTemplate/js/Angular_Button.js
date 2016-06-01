/**
 * Created by Jatupat Chaiprasert on 01-Jun-16.
 */

angular.module('buttonsDemo1', ['ngMaterial'])
.controller('AppCtrl', function($scope) {
  $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;
  $scope.googleUrl = 'http://google.com';
});