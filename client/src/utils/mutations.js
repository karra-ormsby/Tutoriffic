import { gql } from "@apollo/client";

export const SAVE_QUIZ = gql`
  mutation saveQuiz($quizData: QuizInput!) {
    saveQuiz(quizData: $quizData) {
      id
      title
      description
      date
      questions {
        question
        answers
      }
      moduleId
    }
  }
`;

export const DELETE_QUIZ = gql`
  mutation removeQuiz($removeQuizId: String!) {
    removeQuiz(id: $removeQuizId) {
      id
      title
      description
      date
      questions {
        question
        answers
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        lastName
        email

      }
    }
  }
`;


export const SAVE_LESSON = gql `
  mutation saveLesson($lessonData: LessonInput!) {
    saveLesson(lessonData: $lessonData) {
      id
      title
      sections {
        heading
        subheading
        text
      }
    }
  }
`;

export const DELETE_LESSON = gql `
  mutation removeLesson($removeLessonId: String!) {
    removeLesson(id: $removeLessonId) {
      id
      title
      sections {
        heading
        subheading
        text
      }
    }
  }
`;

export const SAVE_POST = gql `
  mutation savePost($postData: PostInput!) {
    savePost(postData: $postData) {
      id
      text
      title
    }
  }
`;

export const DELETE_POST = gql `
  mutation removePost($removePostId: String!) {
    removePost(id: $removePostId) {
      id
      title
      text
    }
  }
`;

export const ADD_COMMENT = gql `
  mutation addCommentToPost($postId: String!, $comment: CommentInput!) {
    addCommentToPost(postId: $postId, comment: $comment) {
      id
      title
      text
      comments {
        _id
        text
      }
    }
  }
`;

export const DELETE_COMMENT = gql `
  mutation removeCommentFromPost($postId: String!, $commentId: ID!) {
    removeCommentFromPost(postId: $postId, commentId: $commentId) {
      id
      title
      text
      comments {
        _id
        text
      }
    }
  }
`;


export const CREATE_USER = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const CREATE_MODULE = gql `
  mutation createModule($moduleData: ModuleInput!) {
    createModule(moduleData: $moduleData) {
      id
      moduleName
      selectedColor
      createdBy
    }
  }
`;