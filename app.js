angular.module('app', []);

angular.module('app').factory('model', ['$http', function($http) {
    var users;

    var ret = {
        getUsers: function() {
            return users;
        },
        load: function() {
            return $http.get('data.json').then(function(respd) {
                var result;
                result = respd.data;
                if (result.success) {
                    users = result.users;
                    //return result.users;
                    return users;
                } else {
                    alert('failed');
                }
            }, function() {
                alert('failed');
            });
        }
    };

    return ret;
}]);

angular.module('app').controller('SearchCtrl', ['$scope', 'model', '$rootScope', function($scope, model, $rootScope) {
    $scope.searchname = 'Ding';
    $scope.search = function(searchname) {
        model.load();
    };
}]);

angular.module('app').controller('ResultCtrl', ['$scope', 'model', function($scope, model) {
    //$scope.users = $rootScope.users;

    $scope.$watch(model.getUsers, function(data, oldData) {
        $scope.users = model.getUsers();
    });
}]);

angular.module('app').directive('searchPanel', [function() {
    return {
        template: '<div>' +
        '<label for="searchname">Name1:</label> <input ng-model="searchname" id="searchname" placeholder="Enter a name">' +
        '<button ng-click="search(searchname)">Search</button>' +
        '</div>'
    };
}]);

angular.module('app').directive('resultPanel', [function() {
    return {
        templateUrl: 'result.html'
    };
}]);

angular.module('app').filter('genderFilter', [function() {
    return function(gender, p2) {
        if (gender == 'M') {
            return 'Male';
        } else if (gender == 'F') {
            return 'Female';
        }
        return '';
    };
}]);
