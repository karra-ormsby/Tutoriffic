import { gql } from '@apollo/client';

export const QUERY_ALL_QUIZZES = gql`
  query quizzes {
    quizzes {
      id
      title
      moduleColour
    }
  }
`;

export const QUERY_QUIZ = gql`
  query quiz($quizId: String!) {
  quiz(id: $quizId) {
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

export const QUIZ_BY_MODULE = gql`
  query quizzesByModuleId($moduleId: ID!) {
    quizzesByModuleId(moduleId: $moduleId) {
      id
      title
      description
      date
      createdBy
      moduleId
      moduleColour
    }
  }
`;

export const QUERY_STUDENTS = gql`
  query GetStudents {
    students {
      id
      firstName
      lastName
      dateOfBirth
      schoolingLevel
      parentGuardian
      contact
      additionalInformation
    }
  }
`;

export const QUERY_GRADES = gql`
query GetGrades {
  grades {
    id
    student {
      id
      firstName
      lastName
    }
    quiz {
      id
      title
    }
    grade
  }
}
`;

export const GET_DUE_DATES = gql`
  query {
    quizzes {
      title
      date
    }
  }
`;

export const QUERY_ALL_LESSONS = gql `
  query lessons {
    lessons {
      id
      title
      moduleColour
    }
  }
`;

export const QUERY_LESSON = gql `
  query lesson($lessonId: String!) {
    lesson(id: $lessonId) {
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

export const LESSON_BY_MODULE = gql `
  query lessonsByModuleId($moduleId: ID!) {
    lessonsByModuleId(moduleId: $moduleId) {
      title
      id
      date
      sections {
        heading
        subheading
        text
      }
      createdBy
      moduleId
      moduleColour
    }
  }
`;

export const GET_LESSON_DATES = gql `
  query lessons {
    lessons {
      title
      date
    }
  }
`;

export const QUERY_ALL_POSTS = gql `
  query posts {
    posts {
      id
      title
      text
      createdBy
    }
  } 
`;

export const QUERY_POST = gql `
  query post($postId: String!) {
    post(id: $postId) {
      id
      title
      text
      createdBy
      comments {
        _id
        text
      }
    }
  }
`;

export const QUERY_COMMENTS_BY_POST = gql`
  query post($postId: String!) {
    post(id: $postId) {
      comments {
        _id
        text
        createdBy
      }
    }
  }
`;

export const QUERY_LOGEDIN = gql `
  query loggedInUser {
    loggedInUser {
      firstName
      lastName
    }
  }
`;

export const QUERY_MODULES = gql `
  query modules {
    modules {
      id
      moduleName
      selectedColor
    }
  }
`;

export const QUERY_MODULE = gql `
  query module($moduleId: ID!) {
    module(id: $moduleId) {
      moduleName
      selectedColor
    }
  }
`;

export const QUERY_ME = gql `
  query query {
    me {
      _id
    }
  }
`;