import { getUsers } from "../users";

export const checkUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const users = await getUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return new Response(
      JSON.stringify({ message: "user not found", error: true }),
      {
        status: 404,
      }
    );
  }

  const isCorrect = user.password === password;

  if (!isCorrect) {
    return new Response(
      JSON.stringify({ message: "password buruu bn", error: true }),
      {
        status: 404,
      }
    );
  }
  return new Response(JSON.stringify({ message: "amjilttai nevterlee" }), {
    status: 200,
  });
};
