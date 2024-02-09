import { cva, cx } from "@style/css";
import { center, circle, grid, vstack } from "@style/patterns";
import { useCallback, useEffect, useRef } from "react";
import { actions, model } from "../model/user-model";
import { ImageWithPlaceholder } from "@shared/ui-kit/image-with-placeholder";

const targetStyle = cva({
  base: {
    height: "100px",
    flexShrink: 0,
  },
  variants: {
    align: {
      start: {
        alignSelf: "flex-start",
      },
      center: {
        alignSelf: "center",
      },
    },
  },
});

export const UserList = () => {
  const observer = useRef<IntersectionObserver>();

  const listEl = useRef<HTMLDivElement>(null);

  const targetEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetEl.current;

    const observerCurrent = observer.current;

    actions.showLoader();

    return () => {
      if (target) {
        observerCurrent?.unobserve(target);
      }
    };
  }, []);

  const ref = useCallback((node: HTMLDivElement) => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const initialLoad = model.users === undefined;

        const scrolledByTheEnd = entries[0].isIntersecting;

        if (initialLoad || scrolledByTheEnd) {
          actions.fetchUsers(model.users?.length);
        }
      },
      { root: listEl.current }
    );

    observer.current.observe(node);
  }, []);

  return (
    <div
      ref={listEl}
      className={grid({
        columns: 1,
        gap: 10,
        overflowY: "auto",
        maxHeight: "100vh",
        height: "100%",
      })}
    >
      {model.users.map((user, i) => (
        <div key={i} className={vstack()}>
          <ImageWithPlaceholder
            src={user.picture.large}
            className={circle({ size: "128px", overflow: "hidden" })}
          />

          <div className={vstack({ gap: 0 })}>
            <b>
              {user.name.first}
              {user.name.last}
            </b>

            <div>{user.email}</div>
          </div>
        </div>
      ))}

      <div
        ref={ref}
        className={cx(
          center(),
          targetStyle({ align: model.users.length ? "start" : "center" })
        )}
      >
        <span>Loading...</span>
      </div>
    </div>
  );
};
