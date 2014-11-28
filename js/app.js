angular.module('ToDoApp', ['ngResource'])
.controller('ToDoCtrl', ['$scope', '$resource', function($scope, $resource) {

    var list_resource = $resource('http://localhost:8080/Grails_Angular_ToDo/todo/:command');

    $scope.todos = list_resource.query({command: 'list'});

    $scope.labels = ['Work', 'Personal', 'Other'];

    $scope.priority = ['High', 'Medium', 'Low'];

    $scope.add_item = function() {
        if($scope.todo_text) {
            $scope.todos.push({text: $scope.todo_text, is_done: false, priority: 'Medium', label: 'Work'});
            $scope.todos[$scope.todos.length - 1] = list_resource.save({command: 'add'}, $scope.todos[$scope.todos.length - 1]);
            console.log($scope.todos[$scope.todos.length - 1]);
            $scope.todo_text = '';
        }
        else {
            alert("No empty tasks allowed, sorry.");
        }
    };

    $scope.update = function() {
        angular.forEach($scope.todos, function (todo) {
            list_resource.save({command: 'update'}, todo);
        });
    };

    $scope.clear = function() {
        var all_todos = $scope.todos;
        $scope.todos = [];
        $scope.options = [];
        angular.forEach(all_todos, function(todo) {
            if(!todo.is_done) {
                $scope.todos.push(todo);
            }
            else if(todo.is_done) {
                list_resource.save({command: 'clear'}, todo);
            }
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