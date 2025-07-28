import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginRequest, loginUser } from "./data/user";

export default {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const loginData: LoginRequest = {
            email: credentials.email as string,
            password: credentials.password as string,
          };

          const response = await loginUser(loginData);

          // console.log({ response });

          if (response.client && response.token) {
            const user = {
              id: response.client.id.toString(),
              email: response.client.email,
              name: `${response.client.first_name} ${response.client.last_name}`,
              firstName: response.client.first_name,
              lastName: response.client.last_name,
              accessToken: response.token,
              reference: response.client.reference,
              // user: {
              //   id: response.client.id.toString(),
              //   email: response.client.email,
              //   name: `${response.client.first_name} ${response.client.last_name}`,
              //   firstName: response.client.first_name,
              //   lastName: response.client.last_name,
              //   reference: response.client.reference,
              // },
            };

            return user;
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
