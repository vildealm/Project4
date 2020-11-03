// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IPerson {
__typename: "Person";
id: number;
last_name: string;
first_name: string;
age: number;
location: string;
description: string;
}

interface IPersonFilter {
age?: number | null;
location?: string | null;
}

interface IQuery {
__typename: "Query";
nameSearch: Array<IPerson | null> | null;
persons: Array<IPerson>;
filterSearch: Array<IPerson | null> | null;
}

interface INameSearchOnQueryArguments {
name: string;
orderBy: string;
pageNumber: number;
}

interface IPersonsOnQueryArguments {
orderBy: string;
pageNumber: number;
}

interface IFilterSearchOnQueryArguments {
filter?: IPersonFilter | null;
orderBy: string;
pageNumber: number;
}

interface IMutation {
__typename: "Mutation";
register: boolean | null;
}

interface IRegisterOnMutationArguments {
last_name: string;
first_name: string;
age: number;
location: string;
description: string;
}
}

// tslint:enable
