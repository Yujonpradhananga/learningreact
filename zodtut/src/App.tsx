import './App.css'
import * as z from "zod";

const Obj = z.object({
  name: z.string(),
  xpbar: z.number()
})

Obj.parse({ username: "lol", xpbar: 10 })

type Obj = z.infer<typeof Obj>;

const haha: Obj = { name: "niga", xpbar: 10 };

const Scheme = z.string().transform((val) => val.length)

type inputScheme = z.input<typeof Scheme>;

type outputScheme = z.output<typeof Scheme>;
