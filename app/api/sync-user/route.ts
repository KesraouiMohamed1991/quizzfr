// app/api/sync-user/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

// Schéma de validation
const UserSyncSchema = z.object({
  user: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email(),
    image: z.string().url().optional(),
  }),
  provider: z.string(),
  providerAccountId: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user, provider, providerAccountId } = UserSyncSchema.parse(body);

    // Envoi au backend Express
    const backendUrl = process.env.EXPRESS_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("EXPRESS_BACKEND_URL non défini");
    }

    const response = await fetch(`${backendUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name ?? "",
        email: user.email,
        image: user.image ?? "",
        provider,
        providerAccountId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur backend:", errorData);
      return NextResponse.json(
        { ok: false, error: "Erreur backend", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ ok: true, data });

  } catch (error) {
    console.error("Erreur dans /api/sync-user:", error);
    return NextResponse.json(
      { ok: false, error: "Erreur interne" },
      { status: 500 }
    );
  }
}
