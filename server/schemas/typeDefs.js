const { gql } = require('apollo-server-express');
const { userData } =require('./resolvers');

const typeDefs = gql`
  type User {
      _id: ID!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
  }

  type Auth {
      token: ID!
      user: User
  }

  type Quiz {
    id: String!
    title: String!
    description: String
    date: String!
    questions: [Questions]!
    createdBy: ID!
    moduleId: ID!
    moduleColour: String!

  }

  type Questions {
    question: String!
    answers: [String]!
  }

  type Student {
    id: String!
    firstName: String!
    lastName: String!
    dateOfBirth: String!
    schoolingLevel: String!
    parentGuardian: String!
    contact: String!
    additionalInformation: String
  }

  input QuizInput {
    id: String!
    title: String!
    description: String
    date: String!
    questions: [QuestionInput!]!
    moduleId: ID!
    moduleColour: String!

  }

  type Grade {
    id: String!
    student: Student!    
    quiz: Quiz!         
    grade: Float!        
}

  input QuestionInput {
    question: String!
    answers: [String!]!
  }

  type Lesson {
    id: String!
    title: String!
    date: String!
    sections: [Sections]!
    createdBy: ID!
    moduleId: ID!
    moduleColour: String!
  }

  type Sections {
    heading: String!
    subheading: String
    text: String!
  }

  input LessonInput {
    id: String!
    title: String!
    date: String!
    sections: [SectionInput]!
    moduleId: ID!
    moduleColour: String!
  }

  input SectionInput {
    heading: String!
    subheading: String
    text: String!
  }

   type Post {
    id: String!
    title: String!
    text: String!
    comments: [Comments]
    createdBy: String!
  }

  type Comments {
    _id: ID!
    text: String!
    createdBy: String!
  }

  input PostInput {
    id: String!
    title: String!
    text: String!
    comments: [CommentInput]
  }

  input CommentInput {
    text: String!
    createdBy: String!
  }

  type Module {
    id: ID!
    moduleName: String!
    selectedColor: String!
    createdBy: ID!
  }

   input ModuleInput {
    moduleName: String!
    selectedColor: String!
    createdBy: ID!
  }

  type Query {
    quizzes: [Quiz]
    quiz(id: String!): Quiz
    lessons: [Lesson]
    lesson(id: String!): Lesson
    posts: [Post]
    post(id: String!): Post
    commentsByPostId(postId: String!): [Comments!]!
    students: [Student]
    grades: [Grade]
    users: [User]
    loggedInUser: User
    modules: [Module]
    module(id: ID!): Module
    quizzesByModuleId(moduleId: ID!): [Quiz]
    lessonsByModuleId(moduleId: ID!): [Lesson]
    me: User
  }
  
  type Mutation {
    saveQuiz(quizData: QuizInput!): Quiz
    removeQuiz(id: String!): Quiz
    saveLesson(lessonData: LessonInput!): Lesson
    removeLesson(id: String!): Lesson
    savePost(postData: PostInput!): Post 
    removePost(id: String!): Post
    addCommentToPost(postId: String!, comment: CommentInput!): Post
    removeCommentFromPost(postId: String!, commentId: ID!): Post
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    createModule(moduleData: ModuleInput!): Module
  }

`;

module.exports = typeDefs;

