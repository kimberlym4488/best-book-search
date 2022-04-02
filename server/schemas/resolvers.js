const { AuthenticationError } = require ('apollo-server-express');
const { User } = require ( '../models');
const { signToken } = require ('../utils/auth');

const resolvers = {
    Query: {
        // if you aren't using one, you can replace it with an underscore. but having all three avail is easier to read.
        me: async ( parent, args, context ) => {
            if (context.user) {
                const userData = await User.findOne( 
                    {_id: context.user._id}).select('-_v-password');

                    return userData;
            }
            throw new AuthenticationError("Not logged in");
        }
    },

    Mutation: {
            addUser: {};

            login: {};

            saveBook: {};

            removeBook: {};
    }


};
module.exports = resolvers;
