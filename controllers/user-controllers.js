const { User } = require('../models')

const userController = {
//get all users
getAllUsers(req, res) {
    User.find({})
        .populate({
            path: 'thoughts',
            select: "-__v"
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
},

//get single user
getUserById({ params }, res) {
    User.findOne({_id: params.userId})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

//post/create new user
createUser({body}, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},

//update/put new user
updateUser({params, body}, res) {
    User.findOneAndUpdate({_id: params.userId}, body, {new: true, runValidators: true})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No User found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},
//delete user (and remove user's associated thoughts?)
deleteUser({params}, res) {
    User.findOneAndDelete(
        {_id: params.userId},
        {$pullAll: {thoughts: params.userId}}
        )
    .then(dbUserData=> {
        if(!dbUserData) {
            res.status(404).json({message: 'No User found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

//add new friend to a user's friend list


addFriend({params, body}, res) {
    User.findOneAndUpdate(
        {_id: params.userId},
         {$push: {friends: params.friendId}}, 
         {new: true, runValidators: true})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No User found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));

    // User.findOneAndUpdate(
    //     {_id: params.friendId},
    //      {$push: {friends: params.userId}}, 
    //      {new: true, runValidators: true})
  
    
},
//delete or remove a friend from a user's friend list
removeFriend({params}, res) {
    User.findOneAndUpdate(
        {_id: params.userId}, 
        {$pull: {friends: params.friendId}}, 
        {new: true, runValidators: true})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No User found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));

    // User.findOneAndUpdate(
    //     {_id: params.friendId}, 
    //     {$pull: {friends: params.userId}}, 
    //     {new: true, runValidators: true})

}, 



}

module.exports = userController;