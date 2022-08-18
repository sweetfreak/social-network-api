const {Schema, model} = require("mongoose");

//name, user's name, timestamp pizza created, timestamp pizza updates, pizza size, pizza toppings

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, "Please enter a valid email address"],
            match:[ /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email address"],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//This is a  VIRTUAL:
//get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//create the PiUserzza model using the UserSchema
const User = model('User', UserSchema);

//export the user model
module.exports = User;

