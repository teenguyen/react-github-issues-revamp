export type RowProps = {
  id: string;
  title: string;
  html_url: string;
  number: number;
  created_at: string;
  state: "open" | "closed";
  user: {
    login: string;
    html_url: string;
  };
  labels: {
    color: string;
    name: string;
  }[];
  assignees: {
    login: string;
    avatar_url: string;
  }[];
  comments: number;
  comments_url: string;
};
