import gql from 'graphql-tag';

export const GET_ALL = gql`
    query persons( $orderBy: String!, $pageNumber: Int!){
        persons(orderBy: $orderBy, pageNumber: $pageNumber){
            id
            first_name
            last_name
            age
            location
            description
        }
    }
`;

export const GET_PERSON = gql`
    query nameSearch($name: String!, $orderBy: String!, $pageNumber: Int!){
        nameSearch(name: $name, orderBy: $orderBy, pageNumber: $pageNumber){
            id
            first_name
            last_name
            age
            location
            description
        }
    }
`;

export const FILTER_SEARCH = gql`
    query filterSearch($age: Int, $location: String, $orderBy: String!, $pageNumber: Int!){
        filterSearch(filter: {age: $age, location: $location}, orderBy: $orderBy, pageNumber: $pageNumber){
            id
            first_name
            last_name
            age
            location
            description
        }
    }
`;