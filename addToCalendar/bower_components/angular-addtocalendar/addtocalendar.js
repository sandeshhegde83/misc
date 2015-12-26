/**
 * angular-addtocalendar v1.1.2
 * An AngularJS directive for adding an event to calendar apps. 
 * 
 * Controller and directive.
 */
'use strict';

angular
	.module('jshor.angular-addtocalendar', [])
	.config([
    '$compileProvider',
    function($compileProvider) {   
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(http(s)?|data):/);
    }
	])
	.controller('AddtocalendarCtrl', ['$scope',
		function($scope) {

			$scope.description = $scope.description || '';

			/**
			 * Renders a .ics file and downloads it to the client browser.
			 * The name of the file will be the event title with alphanumeric chars
			 * having the extension `.ics`.
			 *
			 * @param  {Boolean} encodeUri  encode the 
			 * @return {String}  ics calendar data
			 */
			function getIcsCalendar(encodeUri) {
				
				var elements = [
					'BEGIN:VCALENDAR',
					'VERSION:2',
					'BEGIN:VEVENT',
					'CLASS:PUBLIC',
					'DESCRIPTION:' + $scope.description,
					'DTSTART;VALUE=DATE:' + $scope.startDate,
					'DTEND;VALUE=DATE:' + $scope.endDate,
					'LOCATION:' + $scope.location,
					'SUMMARY;LANGUAGE=en-us:' + $scope.title,
					'TRANSP:TRANSPARENT',
					'END:VEVENT',
					'END:VCALENDAR'
				];

				return elements.join('\n');

			}

			
			function dlIcal() {

				// render safe filename for iCal (only \w chars) based on event title
				var fileName = $scope.title.replace(/[^\w -]+/g, '') + '.ics';

				download(getIcsCalendar(), fileName, 'application/octet-stream');

			}

			$scope.calendarUrl = {
				dlIcal    : dlIcal
			};

		}

	])
	.directive('addtocalendar', function() {

    return {

      restrict: 'E',
      scope: {
        startDate: '@',
        endDate: '@',
        title: '@',
        description: '@',
        location: '@',
        className: '@',
        btnText: '@'
      },
    	controller: 'AddtocalendarCtrl',
      /*template: '\
      <div class="btn-group" dropdown on-toggle="toggled(open)">\
	      <span\
	      	ng-class="className || \'btn btn-sm btn-default dropdown-toggle\'"\
	      	dropdown-toggle>\
	      	{{btnText || \'Add to calendar\'}} <span class="caret"></span>\
	      </span>\
	      <ul class="dropdown-menu">\
		      <li><a ng-click="calendarUrl.dlIcal()">iCalendar</a></li>\
		      <li><a href="{{calendarUrl.google}}" target="_blank">Google Calendar</a></li>\
		      <li><a ng-click="calendarUrl.dlIcal()">Outlook</a></li>\
		      <li><a href="{{calendarUrl.yahoo}}" target="_blank">Yahoo! Calendar</a></li>\
		      <li><a href="{{calendarUrl.microsoft}}" target="_blank">Microsoft Calendar</a></li>\
	      </ul>\
      </div>'*/
      template: '\
      <div class="btn-group">\
      <a ng-click="calendarUrl.dlIcal()" href="#"><img src="calendar-icon.png"  width="50" alt="Computer Hope"/>\
      </a>'
		};

	});
