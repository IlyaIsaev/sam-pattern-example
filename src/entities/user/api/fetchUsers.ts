import { User } from "@shared/types/user";

type FetchUsersInput = {
  page: number;
  results?: number;
};

export const fetchUsers = (
  { page, results = 10 }: FetchUsersInput,
  signal?: AbortSignal
): Promise<{ results: User[] }> =>
  fetch(
    `https://randomuser.me/api/?page=${page}&results=${results}&inc=name,picture,email`,
    { signal }
  ).then((res) => res.json());
