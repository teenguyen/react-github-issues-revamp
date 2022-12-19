export type RowProps = {
  id: string;
  title: string;
  number: number;
  created_at: Date;
  state: "open" | "closed";
  user: {
    login: string;
  };
  labels: {
    color: string;
    name: string;
  }[];
};
