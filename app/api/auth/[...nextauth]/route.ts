// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider) {
        try {
          // Utilise l'URL absolue pour éviter les problèmes
          const syncResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/sync-user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
              },
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            }),
          });

          if (!syncResponse.ok) {
            console.error("Échec de la synchronisation:", await syncResponse.text());
            // Ne bloque pas la connexion même si la sync échoue
          }
        } catch (error) {
          console.error("Erreur de synchronisation:", error);
        }
      }
      return true; // Toujours autoriser la connexion
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
