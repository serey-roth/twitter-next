export type Post= {
  title: string;
  content: string;
};

export type Posts = {
  posts: Array<
    {
      id: number;
    } & Post
  >;
};
