// Point this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export interface UploadResponse {
  transcript: string;
}

export const uploadAudio = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Upload failed" }));
    throw new Error(err.error || "Upload failed");
  }

  return res.json();
};
