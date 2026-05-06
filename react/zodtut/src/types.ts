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
z.int64({
  error: (issue) => {
    if (issue.code === "too_big") {
      return { message: `Value must be <${issue.maximum}` };
    }

    return undefined;
  },
});
const schema = z.string();
schema.parse(12, {
  error: iss => "per-parse custom error"
});

const emailMeta = z.email().meta({
  id: "emailaddress",
  title: "email",
  description: "Please enter a valid email address",
})
