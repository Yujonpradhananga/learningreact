import * as z from "zod"

const userName = z.string().min(5).max(15);
const userAge = z.number().positive().int();
const userEmail = z.string().email();

console.log(userName.parse('John Doe'));
console.log(userAge.parse(30));
console.log(userEmail.parse("johnDoe@gmail.com"));

const userSchema = z.object({
  name: userName,
  age: userAge,
  email: userEmail
})

const userData = z.object({
  name: "niga",
  age: 34,
  email: "niga@niga.com"
})

const result = userSchema.safeParse(userData);
