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
				var descriptionValue = 'Hotel Information:\\n'+$scope.hotelName+'\\n'+$scope.streetName+
				'\\n'+$scope.city+'\\, '+$scope.state+'\\, '+$scope.country+'\\, '+$scope.zip+'\\nPhone: '+
				$scope.phone+'\\n'+$scope.hotelUrl+'\\n\\nStay Information:\\nConfirmation #: '+$scope.confirmationNumber+
				'\\nCheck In Time: 3:00 PM\\nCheck Out Time: 12:00 PM\\nChoice Privileges Member Number: '+$scope.memberNumber+
				'\\n\\nView Reservation\\nhttps://secureqa.choicehotels.com/ires/en-US/html/ViewResForm\\n\\n';

				console.log(descriptionValue);
				
				var elements = [
					'BEGIN:VCALENDAR',
					'VERSION:2',
					'BEGIN:VEVENT',
					'CLASS:PUBLIC',
					'DESCRIPTION:' + descriptionValue,
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
        hotelName: '@',
        streetName: '@',
        city: '@',
        state: '@',
        country: '@',
        zip: '@',
        phone: '@',
        hotelUrl: '@',
        confirmationNumber: '@',
        memberNumber: '@',
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
