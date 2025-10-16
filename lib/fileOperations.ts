import { toast } from "sonner";

interface FileProps {
  file: File;
  key: string;
  objectUrl: string;
  isUploading?: boolean;
  isError?: boolean;
  isDeleting?: boolean;
}

type SetFilesFunction = React.Dispatch<React.SetStateAction<FileProps[]>>;

export const uploadFile = async (
  file: File,
  setFiles: SetFilesFunction
): Promise<string | undefined> => {
  const updateFileState = (updates: Partial<FileProps>) => {
    setFiles((prev) =>
      prev.map((f) => (f.file === file ? { ...f, ...updates } : f))
    );
  };

  updateFileState({ isUploading: true, isError: false });
  setFiles((prev) => prev.filter((f) => !f.isError || f.file === file));

  try {
    const res = await fetch("/api/s3/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
        size: file.size,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to get upload URL");
    }

    const { url, key, publicUrl } = await res.json();
    updateFileState({ key });

    // Upload to S3
    const awsRes = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Content-Length": file.size.toString(),
      },
      body: file,
    });

    if (!awsRes.ok) {
      const errorText = await awsRes.text();
      console.error("خطأ في رفع الملف إلى S3");
      throw new Error(`Failed to upload to S3: ${errorText}`);
    }

    toast.success("تم رفع الملف بنجاح");
    updateFileState({ isUploading: false, isError: false });

    return publicUrl;
  } catch (error) {
    toast.error("فشل في رفع الملف، يرجى المحاولة مرة أخرى.");
    updateFileState({ isUploading: false, isError: true, isDeleting: false });

    return undefined;
  }
};

export const deleteFile = async (
  file: FileProps,
  setFiles: SetFilesFunction,
  imagesUlr: string[]
): Promise<string[]> => {
  if (!file?.key || file.isError) return imagesUlr;

  const updateFileState = (updates: Partial<FileProps>) => {
    setFiles((prev) =>
      prev.map((f) => (f === file ? { ...f, ...updates } : f))
    );
  };

  updateFileState({ isDeleting: true, isUploading: false, isError: false });

  try {
    const res = await fetch("/api/s3/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: file.key }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to delete file");
    }

    const { publicUrl } = await res.json();
    toast.success("تم حذف الملف بنجاح");

    setFiles((prev) => prev.filter((f) => f.key !== file.key));

    if (file.objectUrl) {
      URL.revokeObjectURL(file.objectUrl);
    }

    const remainingUrls = imagesUlr.filter((url) => url !== publicUrl);
    return remainingUrls;
  } catch (error) {
    toast.error("فشل في حذف الملف");
    updateFileState({ isDeleting: false, isError: true });

    throw error;
  }
};
