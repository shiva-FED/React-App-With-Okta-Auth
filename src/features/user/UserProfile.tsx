import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { type User } from "../../types/user";
import { getUserByEmail, updateUser } from "../../services/userService";
import UpdateForm from "../../shared/updateForm";

export default function UserProfile() {
  const { authState } = useOktaAuth();
  const [user, setUser] = useState<User | null>(null);

  const email = authState?.idToken?.claims.email;

  useEffect(() => {
    const fetchUser = async () => {
      if (email) {
        const res = await getUserByEmail(email);
        setUser(res.data[0]);
      }
    };

    fetchUser();

    window.addEventListener("focus", fetchUser);

    return () => window.removeEventListener("focus", fetchUser);
  }, [email]);

  const updateProfile = async () => {
    if (user) {
      await updateUser(user.id, user);
      alert("Updated!");
    }
  };

  if (!user) return <div>LoadingUser...</div>;

  return (
    <UpdateForm user={user} setUser={setUser} updateProfile={updateProfile} />
  );
}
