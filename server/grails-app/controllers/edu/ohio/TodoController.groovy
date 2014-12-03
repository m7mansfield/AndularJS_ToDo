package edu.ohio

import grails.converters.JSON

class TodoController {

    //This might add a task to the db.
    def add() {
        def task = new Task(request.JSON)
        task.save(flush: true)
        render task as JSON
    }

    //I thinks this function should return all the tasks in the db.
    def list() {
        render Task.list() as JSON
    }

    //This should return a specific task in the db.
    def retrieve() {
        def task = Task.findById(request.JSON.id)
        render task as JSON
    }

    //This should update a task in the db.
    def update() {
        def task = Task.findById(request.JSON.id)
        task.is_done = request.JSON.is_done
        task.priority = request.JSON.priority
        task.label = request.JSON.label
        task.text = request.JSON.text
        task.username = request.JSON.username
        task.assigner = request.JSON.assigner
        task.comments = request.JSON.comments
        task.save(flush: true)
        render task as JSON
    }

    //This hopefully can be used to remove items from the db.
    def clear() {
        def task = Task.findById(request.JSON.id)
        task.delete(flush: true)
        render ''
    }
}
