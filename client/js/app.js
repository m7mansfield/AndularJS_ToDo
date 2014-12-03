angular.module('ToDoApp', ['ngResource'])
.controller('ToDoCtrl', ['$scope', '$resource', function($scope, $resource) {

    var list_resource = $resource('http://localhost:8080/Grails_Angular_ToDo/todo/:command');

    $scope.todos = list_resource.query({command: 'list'});

    $scope.labels = ['Work', 'Personal', 'Other'];

    $scope.priority = ['High', 'Medium', 'Low'];

    $scope.purge = function() {
        for(var i = 0; i < $scope.todos.length; i++) {
            if(($scope.todos[i].username != $scope.user) && ($scope.todos[i].assigner != $scope.user)) {
                $scope.todos.splice(i, 1);
                $scope.purge();
                break;
            }
        }
    };

    $scope.switcher = function() {
        if($scope.which_user === 'self') {
            return $scope.user;
        }
        else if($scope.which_user === 'other') {
            return $scope.assignee;
        }
    };

    $scope.add_item = function() {
        if($scope.todo_text && $scope.user) {
            $scope.todos.push({
                text: $scope.todo_text,
                is_done: false,
                priority: 'Medium',
                label: 'Work',
                username: $scope.switcher(),
                assigner: $scope.user,
                comments: ''
            });
            $scope.todos[$scope.todos.length - 1] = list_resource.save({command: 'add'}, $scope.todos[$scope.todos.length - 1]);
            $scope.todo_text = '';
            $scope.assignee = '';
        }
        else {
            alert("No empty tasks/username allowed, sorry.");
        }
        $scope.purge();
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

    $scope.plural = function() {
        if($scope.remaining() > 1) {
            return 's';
        }
        else {
            return '';
        }
    };

    $scope.assigned = function(ind) {
        if($scope.todos[ind].assigner !== $scope.user) {
            return '(Assigned by ' + $scope.todos[ind].assigner + ')';
        }
        else if(($scope.todos[ind].assigner == $scope.user) && ($scope.todos[ind].username !== $scope.user)) {
            return '(Assigned to ' + $scope.todos[ind].username + ')';
        }
    };
}]);
