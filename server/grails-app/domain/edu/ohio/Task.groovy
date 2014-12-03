package edu.ohio


//This is the class for the objects in the to do list.
class Task {

    String text
    String label
    String priority
    String username
    String assigner
    String comments
    boolean is_done

    static constraints = {
        text blank: false, unique: true
        label nullable: true
        priority nullable: true
        username nullable: false
        assigner nullable: false
        comments nullable: true
    }
}
