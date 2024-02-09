import { center } from "@style/patterns";
import { Users } from "@widgets/users";

export const HomePage = () => {
  return (
    <div className={center({ alignItems: "flex-start", height: "100vh" })}>
      <Users />
    </div>
  );
};
