import NextAuth, { DefaultSession } from "next-auth"
//
//declare module "next-auth" {
//  /**
//   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//   */
//  interface Session {
//    user: {
//      /** The user's postal address. */
//      address: string
//    }
//  }
//}

declare module "next-auth" {
    interface Session {
        user: {
            id: string
        } & DefaultSession["user"];
    }
}
