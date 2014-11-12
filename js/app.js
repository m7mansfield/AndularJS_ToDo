angular.module('ToDoApp', [])
.controller('ToDoCtrl', ['$scope', function($scope) {
    $scope.todos = [
        {
            text: 'Learn AngularJS',
            is_done: false,
            rank: 1,
            label: 'Work'
        },
        {
            text: 'Finish this app',
            is_done: false,
            rank: 2,
            label: 'Work'
        }
    ];
    $scope.add_item = function() {
        $scope.todos.push({text: $scope.todo_text, is_done: false});
        $scope.todo_text = '';
    };
    $scope.clear = function() {
        var all_todos = $scope.todos;
        $scope.todos = [];
        angular.forEach(all_todos, function(todo) {
            if(!todo.is_done) $scope.todos.push(todo);
        });
    };
    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            if(!todo.is_done) count++;
        });
        return count;
    };
}]);