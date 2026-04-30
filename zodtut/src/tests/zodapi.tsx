import { z } from 'zod';
import { useEffect } from 'react';

const postSchema = z.object({
  userId: z.number().positive().int(),
  id: z.number().positive().int(),
  title: z.string(),
  body: z.string()
});

const postSchemaArray = z.array(postSchema);

type Posts = z.infer<typeof postSchemaArray>;

const ZodApi = () => {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts: Posts) => {
        const validatedPosts = postSchemaArray.safeParse(posts);
        if (validatedPosts.success === false) {
          console.log("Validation Error:", validatedPosts.error);
          return;
        }
        console.log(validatedPosts.data);
      });
  }, []);
  return <div>ZodApi </div>;
};

export default ZodApi;
