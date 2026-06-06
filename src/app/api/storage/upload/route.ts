import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Upload a file to blog-images storage.
 * Protected: Requires authentication.
 * Accepts multipart/form-data with:
 *   - file: The image file
 *   - folder: Optional folder path (default: "blog")
 *  Adding something here
 */
export async function POST(request: NextRequest) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "blog";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB." },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();

    // Generate a unique path with date-based structure
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const timestamp = now.getTime();

    // Clean up filename: replace spaces, remove special chars
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .replace(/_+/g, "_");

    const filePath = `${folder}/${year}/${month}/${timestamp}_${sanitizedName}`;

    // Convert File to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer();

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(data.path);

    return NextResponse.json({
      path: data.path,
      url: urlData.publicUrl,
      name: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 },
    );
  }
}
