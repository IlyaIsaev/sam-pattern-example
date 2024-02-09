type Action<A extends unknown[], P> = (...args: A) => Promise<P> | P;

type EnchancedAction<A extends unknown[]> = (...args: A) => void;

type AddComponentInput<M, A extends Record<string, Action<any, any>>> = {
  model: M;
  actions: A;
  acceptor: (model: M) => (proposal: ReturnType<A[keyof A]>) => void;
  reactor?: (m: M) => void;
  nap?: (
    m: M
  ) => (actions: { [K in keyof A]: EnchancedAction<Parameters<A[K]>> }) => void;
};

let render: () => void;

export const getRender = (renderFx: typeof render) => {
  render = renderFx;
};

export const addComponent = <M, A extends Record<string, Action<any, any>>>({
  model,
  acceptor,
  reactor,
  actions,
  nap,
}: AddComponentInput<M, A>) => {
  const enrichedActions = Object.keys(actions).reduce(
    (acc, key) => (
      // @ts-ignore
      (acc[key] = async (...args: any) => {
        const action = actions[key];

        const proposal = await action(...args);

        acceptor(model)(proposal);

        if (reactor) {
          reactor(model);
        }

        if (nap) {
          nap(model)(acc);
        }

        render();
      }),
      acc
    ),
    {} as { [K in keyof A]: EnchancedAction<Parameters<A[K]>> }
  );

  return {
    model,
    actions: enrichedActions,
  };
};
