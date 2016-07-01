/**
 * @Author: Geoffrey Bauduin <bauduin.geo@gmail.com>
 */

angular.module("ion.rangeslider", []);

angular.module("ion.rangeslider")
    //original
//     .directive("ionRangeSlider", [
//     function () {
//
//         return {
//             restrict: "E",
//             scope: {
//                 min: "=",
//                 max: "=",
//                 type: "@",
//                 prefix: "@",
//                 maxPostfix: "@",
//                 prettify: "@",
//                 grid: "@",
//                 gridMargin: "@",
//                 postfix: "@",
//                 step: "@",
//                 hideMinMax: "@",
//                 hideFromTo: "@",
//                 from: "=",
//                 to: "=",
//                 disable: "=",
//                 onChange: "&onChange",
//                 onFinish: "&"
//             },
//             replace: true,
//             link: function ($scope, $element) {
//                 $element.ionRangeSlider({
//                     min: $scope.min,
//                     max: $scope.max,
//                     type: $scope.type,
//                     prefix: $scope.prefix,
//                     maxPostfix: $scope.maxPostfix,
//                     prettify: $scope.prettify,
//                     grid: $scope.grid,
//                     gridMargin: $scope.gridMargin,
//                     postfix: $scope.postfix,
//                     step: $scope.step,
//                     hideMinMax: $scope.hideMinMax,
//                     hideFromTo: $scope.hideFromTo,
//                     from: $scope.from,
//                     to: $scope.to,
//                     disable: $scope.disable,
//                     onChange: function (a) {
//                         $scope.onChange && $scope.onChange({
//                             a: a
//                         });
//                     },
//                     onFinish: $scope.onFinish
//                 });
//                 var watchers = [];
//                 watchers.push($scope.$watch("min", function (value) {
//                     $element.data("ionRangeSlider").update({
//                         min: value
//                     });
//                 }));
//                 watchers.push($scope.$watch('max', function (value) {
//                     $element.data("ionRangeSlider").update({
//                         max: value
//                     });
//                 }));
//                 watchers.push($scope.$watch('from', function (value) {
//                     $element.data("ionRangeSlider").update({
//                         from: value
//                     });
//                 }));
//                 watchers.push($scope.$watch('to', function (value) {
//                     $element.data("ionRangeSlider").update({
//                         to: value
//                     });
//                 }));
//                 watchers.push($scope.$watch('disable', function (value) {
//                     $element.data("ionRangeSlider").update({
//                         disable: value
//                     });
//                 }));
//             }
//         }
//
//     }
// ])

// .directive('ionSlider', ['$document', function($document) {
//     "use strict";
//     return {
//         restrict: 'EA',
//         require: 'ngModel',
//         template: '<input type="text" />',
//         link: function(scope, element, attrs, ngModel) {
//             var input = element.find('input'),
//                 isDouble = attrs.type === 'double';
//             input.ionRangeSlider({
//                 grid: true,
//                 hide_min_max: true,
//                 values: scope.$eval(attrs.values),
//                 min_prefix: attrs.minPrefix,
//                 max_prefix: attrs.maxPrefix,
//                 min_postfix: attrs.minPostfix,
//                 max_postfix: attrs.maxPostfix,
//                 min: +attrs.min,
//                 max: +attrs.max,
//                 type: attrs.type
//             });
//             var slider = input.data("ionRangeSlider");
//
//             ngModel.$render = function() {
//                 var options;
//                 if(isDouble) {
//                     options = ngModel.$viewValue || {};
//                 } else {
//                     options = {
//                         from: ngModel.$viewValue
//                     };
//                 }
//                 slider.update(options);
//             };
//             input.on('change', function() {
//                 ngModel.$setViewValue(isDouble ? {from: input.data("from"), to: input.data("to")} : input.data("from"));
//             });
//             element.on('mousedown', function() {
//                 if(!scope.$eval(attrs.ngDisabled)) {
//                     $document.one('mouseup', function() {
//                         scope.$emit('sliderSlideFinished');
//                     });
//                 }
//             });
//             scope.$watch(attrs.ngDisabled, function(disabled) {
//                 slider.update({
//                     disable: disabled
//                 });
//             });
//             scope.$on('$destroy', function() {
//                 slider.destroy();
//             });
//         }
//     };
// }]);

    //https://github.com/IonDen/ion.rangeSlider/issues/215 -- user ahmadassaf

    .directive('ionslider', ['$timeout', function($timeout) {
        return {
            restrict: 'EA',
            require : '^ngModel',
            scope: {
                min       : '=',
                max       : '=',
                type      : '@',
                prefix    : '@',
                maxPostfix: '@',
                prettify  : '@',
                grid      : '@',
                gridMargin: '@',
                postfix   : '@',
                step      : '@',
                hideMinMax: '@',
                hideFromTo: '@',
                from      : '=',
                to      : '=',
                disable   : '=',
                onChange  : '=',
                onFinish  : '=',
                ngModel   : '&'

            },
            template: '<div></div>',
            replace: true,
            link: function($scope, $element, attrs, modelCtrl) {
                (function init() {
                    $element.ionRangeSlider({
                        min       : $scope.min,
                        max       : $scope.max,
                        type      : $scope.type,
                        prefix    : $scope.prefix,
                        maxPostfix: $scope.maxPostfix,
                        prettify  : $scope.prettify,
                        grid      : $scope.grid,
                        gridMargin: $scope.gridMargin,
                        postfix   : $scope.postfix,
                        step      : $scope.step,
                        hideMinMax: $scope.hideMinMax,
                        hideFromTo: $scope.hideFromTo,
                        from      : $scope.from,
                        to      : $scope.to,
                        disable   : $scope.disable,
                        //onStart : setRange,
                        onChange  : $scope.onChange,
                        onFinish  : setRange
                    });
                })();

                function setRange (){
                    $scope.$evalAsync(function() {
                        var str_values = $element.prop('value').split(';');
                        var values = [];
                        var values0 = parseInt(str_values[0]);
                        var values1 = parseInt(str_values[1]);
                        values.push(values0);
                        values.push(values1);
                        console.log(values);
                        modelCtrl.$setViewValue(values);
                    });
                }

                $scope.$watch('min', function(value) {
                    $timeout(function() {
                        $element.data("ionRangeSlider").update({
                            min: value
                        });
                    });
                }, true);
                $scope.$watch('max', function(value) {
                    $timeout(function() {
                        $element.data("ionRangeSlider").update({
                            max: value
                        });
                    });
                });
                $scope.$watch('from', function(value) {
                    $timeout(function() {
                        $element.data("ionRangeSlider").update({
                            from: value
                        });
                    });
                });
                $scope.$watch('to', function(value) {
                    $timeout(function() {
                        $element.data("ionRangeSlider").update({
                            to: value
                        });
                    });
                });
                $scope.$watch('disable', function(value) {
                    $timeout(function() {
                        $element.data("ionRangeSlider").update({
                            disable: value
                        });
                    });
                });
            }
        };
    }]);
