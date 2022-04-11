const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // if you aren't using one, you can replace it with an underscore. but having all three avail is easier to read.
    me: async (parent, args, context) => {
      if (context) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-_v-password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // could do args.email, args.password
    login: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect email");
      }
      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) throw new AuthenticationError("Incorrect password");

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, args, context) => {
    
      if (context.user) {
        const addBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedBooks: args.input,
            },
          },
          { new: true }
        );

        return addBook;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeBook: async (parent, args, context) => {
      if (context.user) {
        const updatedList = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );

        return updatedList;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};
module.exports = resolvers;
