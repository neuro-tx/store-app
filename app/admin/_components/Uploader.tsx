"use client";

import { Button } from "@/components/ui/button";
import { deleteFile, uploadFile } from "@/lib/fileOperations";
import { cn } from "@/lib/utils";
import { ImageUp, Loader2, TriangleAlert, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

interface FileProps {
  file: File;
  key: string;
  objectUrl: string;
  isUploading?: boolean;
  isError?: boolean;
  isDeleting?: boolean;
}

type Dir = "products" | "categories";

interface UploaderProps {
  multiple?: boolean;
  dir: Dir;
  maxFiles: number;
  onChange?: (value: string | string[]) => void;
  clear?: boolean;
}

const Uploader = ({
  multiple = false,
  maxFiles,
  onChange,
  dir,
  clear = false,
}: UploaderProps) => {
  const [files, setFiles] = useState<Array<FileProps>>([]);
  const { getValues } = useFormContext();

  useEffect(() => {
    if (clear && files.length > 0) {
      files.forEach((f) => {
        if (f.objectUrl) URL.revokeObjectURL(f.objectUrl);
      });
      setFiles([]);
      onChange?.([]);
    }
  }, [clear]);

  const handleRejection = (rejections: FileRejection[]) => {
    const error = rejections[0]?.errors[0];
    if (!error) return;

    switch (error.code) {
      case "file-invalid-type":
        toast.error(
          "نوع الملف غير مدعوم، يُرجى رفع صورة بصيغة JPG أو PNG أو WEBP."
        );
        break;
      case "file-too-large":
        toast.error("حجم الملف كبير جدًا، الحد الأقصى المسموح هو 5 ميجابايت.");
        break;
      case "too-many-files":
        toast.error(`يمكنك رفع ${maxFiles} صور كحد أقصى فقط.`);
        break;
      default:
        toast.error("حدث خطأ ما، يرجى المحاولة مرة أخرى.");
        break;
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        handleRejection(fileRejections);
        return;
      }

      setFiles((prev) => prev.filter((f) => !f.isError));

      if (acceptedFiles.length === 0) return;

      const currentFiles = files ?? [];
      const totalAfterAdd = currentFiles.length + acceptedFiles.length;

      if (totalAfterAdd > maxFiles) {
        toast.error(`لا يمكنك رفع أكثر من ${maxFiles} صور.`);
        return;
      }

      const newFiles = acceptedFiles.map((f) => ({
        file: f,
        objectUrl: URL.createObjectURL(f),
        key: "",
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      const newUrls = await Promise.all(acceptedFiles.map(handleUpload));
      const validNewUrls = newUrls.filter(
        (url): url is string => url !== undefined
      );

      let existingUrls: string[] = [];

      if (multiple) {
        try {
          existingUrls = getValues("images") || [];
        } catch {
          existingUrls = [];
        }
      } else {
        existingUrls = [];
      }

      const res = [...existingUrls, ...validNewUrls];
      if (multiple) {
        onChange?.(res);
      } else {
        onChange?.(res[0]);
      }
    },
    [onChange, files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: multiple,
    maxFiles: maxFiles,
    maxSize: 5 * 1024 * 1024,
  });

  const handleUpload = async (file: File) => {
    const publicUrl = await uploadFile(file, setFiles, dir);
    return publicUrl;
  };

  const handleDelete = async (file: FileProps) => {
    try {
      let currentValue: string | string[] = [];
      try {
        currentValue = getValues("images") || [];
      } catch {
        currentValue = multiple ? [] : "";
      }

      if (multiple) {
        const urls = Array.isArray(currentValue) ? currentValue : [];
        const remainingUrls = await deleteFile(file, setFiles, urls);
        onChange?.(remainingUrls);
      } else {
        await deleteFile(file, setFiles);
        onChange?.("");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const layout =
    maxFiles === 3 ? "grid gap-3 sm:grid-cols-3 w-full" : "grid w-full";

  return (
    <div
      className={cn(maxFiles === 3 ? "space-y-5" : "grid sm:grid-cols-2 gap-3")}
    >
      <div
        {...getRootProps()}
        className={cn(
          "w-full h-52 flex items-center justify-center rounded-md transition-all duration-200 overflow-hidden border-2 p-1 cursor-pointer hover:bg-muted/60 border-dashed bg-muted/50",
          isDragActive ? "border-solid" : "border-dashed bg-muted"
        )}
      >
        <input {...getInputProps()} />
        <div className="text-center h-40 flex flex-col items-center justify-center gap-2">
          <div className="size-11 grid place-items-center bg-muted-foreground/50 rounded-full text-white">
            <ImageUp size={25} />
          </div>

          {isDragActive ? (
            <p className="text-sm font-medium text-muted-foreground">
              أسقط الملف هنا...
            </p>
          ) : (
            <p className="text-sm font-medium text-muted-foreground">
              اسحب وأفلت صورك بصيغ PNG، JPG، Webp، أو SVG هنا أو <br />
              <span className="text-primary">انقر لاختيار الملفات</span>
            </p>
          )}
        </div>
      </div>

      {files && (
        <div className={layout}>
          {files.map((f, i) => (
            <div
              key={i}
              className={cn(
                "border w-full h-44 relative rounded-sm overflow-hidden",
                maxFiles === 1 && "h-52 rounded-lg"
              )}
            >
              <Image
                src={f.objectUrl}
                alt="product"
                width={200}
                height={200}
                className={cn(
                  "size-full rounded-sm object-cover",
                  f.isUploading && "brightness-50"
                )}
              />

              {(f.isUploading || f.isDeleting) && (
                <div className="absolute inset-0 grid place-items-center bg-black/30 z-10 transition-opacity duration-200">
                  <Loader2 className="animate-spin text-white" size={26} />
                </div>
              )}

              {f.isError && (
                <div className="absolute inset-0 grid place-items-center bg-black/70">
                  <div className="flex items-center justify-center flex-col">
                    <div className="size-12 grid place-items-center rounded-full text-red-500 bg-red-500/50 cursor-pointer">
                      <TriangleAlert size={28} />
                    </div>
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      فشل في الرفع
                    </p>
                  </div>
                </div>
              )}

              {/* only show the button after the file is uploading... */}
              {!f.isUploading && !f.isDeleting && !f.isError && (
                <Button
                  type="button"
                  variant="destructive"
                  className="absolute top-1 right-1 cursor-pointer rounded-full size-7 md:size-8 z-8"
                  onClick={() => handleDelete(f)}
                >
                  <X />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Uploader;
