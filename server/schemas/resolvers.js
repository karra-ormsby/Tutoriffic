
const { Quiz, User, Lesson, Post,Student, Grade, Module } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
  quizzes: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to view your lessons.');
      }

      const userQuizzes = await Quiz.find({ createdBy: user._id });

      return userQuizzes;
    },
    quiz: async (parent, { id }) => {
      const foundQuiz = await Quiz.findOne({ id: id });
      if (!foundQuiz) {
        throw new Error('Cannot find a quiz with this id!');
      }
      return foundQuiz;
    },
    quizzesByModuleId: async (parent, { moduleId }) => {
      const quizzesByModule = await Quiz.find({ moduleId });
      return quizzesByModule;
    },
    lessons: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to view your lessons.');
      }

      const userLessons = await Lesson.find({ createdBy: user._id });

      return userLessons;
    },
    lesson: async (parent, { id }) => {

      const foundLesson = await Lesson.findOne({ id: id });

      if (!foundLesson) {
        throw new Error('Cannot find a lesson with this id!');
      }

      return foundLesson;
    },
    lessonsByModuleId: async (parent, { moduleId }) => {
      const lessonsByModule = await Lesson.find({ moduleId });
      return lessonsByModule;
    },
    posts: async () => {

      return await Post.find();
    },
    post: async (parent, { id }) => {

      const foundPost = await Post.findOne({ id: id });

      if (!foundPost) {
        throw new Error('Cannot find a post with this id!');
      }

      return foundPost;
    },
    commentsByPostId: async (parent, { postId }) => {
        return await Comments.find({ postId });
    },
      
    students: async () => {
      return await Student.find();
    },
    grades: async () => {
      return await Grade.find();
    },
    users: async () => {
      return User.find();
    },
    loggedInUser: async (parent, args, { user }) => {
      if (!user) {
        return null;
      }
      return user;
    },
    modules: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to view your modules.');
      }

      const userModules = await Module.find({ createdBy: user._id });

      return userModules;
    },
    module: async (parent, { id }) => {
      const foundModule = await Module.findOne({ _id: id });
      if (!foundModule) {
        throw new Error('Cannot find a module with this id!');
      }
      return foundModule;
    },
    me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
    }
  },
  Mutation: {
    saveQuiz: async (parent, { quizData }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a quiz.');
      }

      const { id, title, description, date, questions, moduleId, moduleColour } = quizData;

      return await Quiz.create({
        id,
        title,
        description,
        date,
        questions,
        createdBy: user._id,
        moduleId,
        moduleColour
      })
    }, 
    removeQuiz: async (parent, { id }) => {
      const foundQuiz = await Quiz.findOne({ id: id });
      if (!foundQuiz) {
        throw new Error('Cannot find a quiz with this id!');
      }
      
      const { title, questions, date } = foundQuiz;

      await Quiz.deleteOne({ id });

      return { id, title, description: foundQuiz.description, date, questions };

    },
    saveLesson: async (parent, { lessonData }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a quiz.');
      }

      const { id, title, date, sections, moduleId, moduleColour } = lessonData;

      return await Lesson.create({
        id,
        title,
        date,
        sections,
        createdBy: user._id,
        moduleId,
        moduleColour
      })
    },
    removeLesson: async (parent, { id }) => {
      const foundLesson = await Lesson.findOne({ id: id });

      if (!foundLesson) {
        throw new Error('Cannot find a lesson with this id!');
      }

      const { title, sections } = foundLesson;

      await Lesson.deleteOne({ id });

      return { id, title, sections };
    },
    savePost: async (parent, { postData }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a post.');
      }

      const { id, title, text } = postData;

      return await Post.create({
        id,
        title,
        text,
        createdBy: `${user.firstName} ${user.lastName}`
      });
    },
    removePost: async (parent, { id }) => {
      const foundPost = await Post.findOne({ id: id });

      if (!foundPost) {
        throw new Error('Cannot find a post with this id!');
      }

      const { title, text, comments } = foundPost;

      await Post.deleteOne({ id });

      return { id, title, text, comments };
    },
    addCommentToPost: async (parent, { postId, comment }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a post.');
      }

      try {
        const post = await Post.findOne({ id: postId });
        if (!post) {
          throw new Error('Post not found');
        }

        const newComment = {
          text: comment.text,
          createdBy: comment.createdBy
        };

        post.comments.push(newComment);
        await post.save();

        return post;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    removeCommentFromPost: async(parent, {postId, commentId}) => {
        const updatedPost = await Post.findOneAndUpdate(
        { id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );

      if (!updatedPost) {
        throw new AuthenticationError("Couldn't find comment with this id!");
      }

      return updatedPost;
    },
    createUser: async (parent, { firstName, lastName, email, password }) => {

      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);

      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createModule: async (parent, { moduleData }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a module.');
      }

      const { moduleName, selectedColor, createdBy } = moduleData;

      return await Module.create({
        moduleName,
        selectedColor,
        createdBy
      })
    }, 
  },
};

module.exports = resolvers;


