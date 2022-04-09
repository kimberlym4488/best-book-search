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

    saveBook: async (
      parent,
      { authors, description, bookId, image, link, title },
      context
    ) => {
      if (context.user) {
        const book = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedBooks: {
                authors: authors,
                description: description,
                bookId: bookId,
                image: image,
                link: link,
                title: title,
              },
            },
          },
          { new: true }
        );

        return book;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedList = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { bookSchema: bookId._id } }
        );
        return updatedList;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};
module.exports = resolvers;
