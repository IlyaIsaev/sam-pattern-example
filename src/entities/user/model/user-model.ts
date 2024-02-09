import { User } from "@shared/types/user";
import { fetchUsers } from "../api/fetchUsers";

import { addComponent } from "@shared/sam";

export const { model, actions } = addComponent({
  model: {
    users: [] as User[],
    showLoader: false,
  },

  actions: {
    showLoader: () => ({
      showLoader: true,
    }),

    fetchUsers: async (numberOfUsers?: number) => {
      const usersPerPage = 10;

      if (numberOfUsers === undefined) {
        return 1;
      }

      const page = numberOfUsers / usersPerPage + 1;

      try {
        const { results } = await fetchUsers({
          page,
          results: usersPerPage,
        });

        return { users: results };
      } catch (e) {
        console.log("Error:", e);
      }

      return {};
    },
  },

  acceptor: (model) => (proposal) => {
    if ("showLoader" in proposal) {
      model.showLoader = proposal.showLoader;
    }

    if ("users" in proposal && Array.isArray(proposal.users)) {
      model.users.push(...proposal.users);

      model.showLoader = false;
    }
  },
});
