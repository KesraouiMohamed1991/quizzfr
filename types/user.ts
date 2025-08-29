// schemas/user.ts (ou dans ton fichier de routes)
import { z } from "zod";

export const UserInput = z.object({
  name: z.string().optional(), // Peut être undefined
  email: z.string().email(),
  image: z.string().url().optional(),
  provider: z.string(), // "google", "github", etc.
  providerAccountId: z.string(), // ID unique chez le provider
});
