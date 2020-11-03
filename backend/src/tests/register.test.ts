import { request } from "graphql-request";
import { host } from "./constants";
import { createConnection } from "typeorm";
import { Person } from "../entity/Person";


const first_name = "Lionel";
const last_name = "Messi";
const age= 34;
const location = "Barcelona";

const mutation = `
mutation {
    register(last_name: "${last_name}", first_name: "${first_name}", age: ${age}, location: "${location}")
}
`
test("Register user", async() =>{
    const response = await request(host, mutation);
    expect(response).toEqual({register: true});
    await createConnection();
    const persons = await Person.find({where: { last_name } });
    const person = persons[0];
    expect(person.last_name).toEqual(last_name);
});