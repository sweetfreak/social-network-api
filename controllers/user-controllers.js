const {User} = require('../models')

const userController = {
//get all users
getAllUsers(req, res) {
    User.find({})
        // .populate({
        //     path: 'thoughts',
        //     select: "-__v"
        // })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
}

//get single user


//post/create new user


//update/put new user

//delete user (and remove user's associated thoughts?)


//add new friend to a user's friend list

//delete or remove a friend from a user's friend list


}

module.exports = userController;