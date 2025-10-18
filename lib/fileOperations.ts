import { toast } from "sonner";

interface FileProps {
  file: File;
  key: string;
  objectUrl: string;
  isUploading?: boolean;
  isError?: boolean;
  isDeleting?: boolean;
}

export interface DeleteFromS3Result {
  success: boolean;
  message: string;
  publicUrl?: string;
}

type SetFilesFunction = React.Dispatch<React.SetStateAction<FileProps[]>>;

export const uploadFile = async (
  file: File,
  setFiles: SetFilesFunction ,
  dirName : string
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
        dirName
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
  imagesUlr?: string[]
): Promise<string[]> => {
  const currentUrls = Array.isArray(imagesUlr) ? imagesUlr : [];
  if (!file?.key || file.isError) return currentUrls;

  const updateFileState = (updates: Partial<FileProps>) => {
    setFiles((prev) =>
      prev.map((f) => (f === file ? { ...f, ...updates } : f))
    );
  };

  updateFileState({ isDeleting: true, isUploading: false, isError: false });

  try {
    const res = await deleteFromS3(file.key);
    if (!res.success) {
      toast.error(res.message);
      throw new Error("faild to delete the file");
    }

    toast.success(res.message);
    setFiles((prev) => prev.filter((f) => f.key !== file.key));

    if (file.objectUrl) {
      URL.revokeObjectURL(file.objectUrl);
    }

    const remainingUrls = currentUrls.filter((url) => url !== res.publicUrl);
    return remainingUrls;
  } catch (error) {
    toast.error("فشل في حذف الملف");
    updateFileState({ isDeleting: false, isError: true });

    throw error;
  }
};

export const deleteFromS3 = async (
  key: string
): Promise<DeleteFromS3Result> => {
  if (!key) {
    return { success: false, message: "المفتاح الخاص بالملف مفقود." };
  }

  try {
    const res = await fetch("/api/s3/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "فشل حذف الملف من خادم التخزين (S3).",
      };
    }

    const data = await res.json();
    return {
      success: true,
      message: "تم حذف الملف بنجاح.",
      publicUrl: data.publicUrl,
    };
  } catch (error) {
    return {
      success: false,
      message: "حدث خطأ غير متوقع أثناء حذف الملف.",
    };
  }
};
