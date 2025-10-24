"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Star,
  Package,
  Pencil,
  Trash2,
  MoreVertical,
} from "lucide-react";

import { useTable } from "@/hooks/use-table";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface TableActions {
  deleteUrl?: string;
  editUrl?: string;
}

interface TableDataProps<T> {
  fetchUrl: string;
  columns: TableColumn<T>[];
  actions?: TableActions;
  pageSize?: number;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function TableData<T extends Record<string, any>>({
  fetchUrl,
  columns,
  actions,
  pageSize = 10,
  searchPlaceholder = "ابحث...",
  emptyMessage = "لا توجد بيانات",
  className = "",
}: TableDataProps<T>) {
  const router = useRouter();
  const {
    data,
    error,
    page,
    totalPages,
    totalItems,
    hasNextPage,
    hasPrevPage,
    setSearch,
    nextPage,
    prevPage,
    startItem,
    endItem,
    isEmpty,
    refetch,
  } = useTable<T>(fetchUrl, { pageSize });

  const [searchInput, setSearchInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [showActionsDialog, setShowActionsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setIsTyping(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, setSearch]);

  const handleRowClick = (item: T) => {
    if (!actions) return;
    setSelectedItem(item);
    setShowActionsDialog(true);
  };

  const handleEdit = () => {
    if (!selectedItem || !actions?.editUrl) return;
    setShowActionsDialog(false);
    router.push(`${actions.editUrl}/${selectedItem._id}`);
  };

  const handleDeleteClick = () => {
    setShowActionsDialog(false);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedItem || !actions?.deleteUrl) return;
    setIsDeleting(true);

    const deletePromise = fetch(`${actions.deleteUrl}/${selectedItem._id}`, {
      method: "DELETE",
    }).then(async (response) => {
      if (!response.ok) throw new Error("فشل الحذف");
      return response.json();
    });

    await toast.promise(deletePromise, {
      loading: "جارٍ حذف العنصر...",
      success: "تم الحذف بنجاح",
      error: "حدث خطأ أثناء الحذف",
    });

    try {
      await deletePromise;
      setSelectedItem(null);
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteDialog(false);
      setIsDeleting(false);
    }
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex items-center gap-4">
        <Input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={searchPlaceholder}
          className="max-w-sm"
        />
        {isTyping && (
          <span className="text-xs text-muted-foreground">جار البحث...</span>
        )}
      </div>

      {isEmpty ? (
        <div className="flex items-center justify-center p-12 border rounded-lg">
          <div className="text-muted-foreground">{emptyMessage}</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center p-12 border rounded-lg border-destructive/50">
          <div className="text-destructive">خطأ: {error}</div>
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead
                      key={String(column.key)}
                      className={cn("text-right", column.className)}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                  {actions && (
                    <TableHead className="text-right w-[80px]">
                      الإجراءات
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item._id || index}>
                    {columns.map((column) => (
                      <TableCell
                        key={String(column.key)}
                        className={column.className}
                      >
                        {column.render
                          ? column.render(item)
                          : item[column.key as keyof T]}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRowClick(item)}
                          className="h-8 w-8"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextPage}
                    disabled={!hasNextPage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>التالي</TooltipContent>
              </Tooltip>
              <span className="text-sm">
                الصفحة {page} من {totalPages}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevPage}
                    disabled={!hasPrevPage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>السابق</TooltipContent>
              </Tooltip>
            </div>

            <div className="text-sm text-muted-foreground">
              عرض <span className="font-medium">{startItem}</span> إلى{" "}
              <span className="font-medium">{endItem}</span> من{" "}
              <span className="font-medium">{totalItems}</span> نتائج
            </div>
          </div>
        </>
      )}

      <Dialog open={showActionsDialog} onOpenChange={setShowActionsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>اختر إجراء</DialogTitle>
            <DialogDescription>
              ماذا تريد أن تفعل مع هذا العنصر؟
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            {actions?.editUrl && (
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={handleEdit}
              >
                <Pencil className="h-4 w-4" />
                تعديل
              </Button>
            )}
            {actions?.deleteUrl && (
              <Button
                variant="outline"
                className="justify-start gap-2 text-destructive hover:text-destructive"
                onClick={handleDeleteClick}
              >
                <Trash2 className="h-4 w-4" />
                حذف
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف هذا العنصر نهائياً.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "جار الحذف..." : "حذف"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Helper Components
export const BooleanBadge = ({
  value,
  trueLabel = "نعم",
  falseLabel = "لا",
  trueIcon: TrueIcon = Check,
  falseIcon: FalseIcon = X,
}: {
  value: boolean;
  trueLabel?: string;
  falseLabel?: string;
  trueIcon?: any;
  falseIcon?: any;
}) => {
  const Icon = value ? TrueIcon : FalseIcon;
  return (
    <Badge variant={value ? "default" : "secondary"} className="gap-1">
      <Icon className="h-3 w-3" />
      {value ? trueLabel : falseLabel}
    </Badge>
  );
};

export const AvailabilityBadge = ({
  isAvailable,
}: {
  isAvailable: boolean;
}) => (
  <BooleanBadge
    value={isAvailable}
    trueLabel="متاح"
    falseLabel="غير متوفر"
    trueIcon={Package}
  />
);

export const FeaturedBadge = ({ isFeatured }: { isFeatured: boolean }) => (
  <BooleanBadge
    value={isFeatured}
    trueLabel="مميز"
    falseLabel="عادي"
    trueIcon={Star}
  />
);

export const DiscountBadge = ({
  hasDiscount,
  discount,
}: {
  hasDiscount: boolean;
  discount?: number;
}) => {
  if (!hasDiscount) return <Badge variant="outline">لا يوجد خصم</Badge>;

  return (
    <Badge
      variant="default"
      className="gap-1 bg-green-500 text-white dark:bg-green-500/20 dark:text-green-500"
    >
      {discount} جنية
    </Badge>
  );
};

export const PriceCell = ({
  price,
  hasDiscount,
  discount,
}: {
  price: number;
  hasDiscount?: boolean;
  discount?: number;
}) => {
  const finalPrice = hasDiscount && discount ? price - discount : price;

  return (
    <div className="flex flex-col gap-1">
      {hasDiscount && discount ? (
        <>
          <span className="text-sm line-through text-muted-foreground">
            ${price.toFixed(2)}
          </span>
          <span className="font-semibold text-green-600">
            ${finalPrice.toFixed(2)}
          </span>
        </>
      ) : (
        <span className="font-semibold">${price.toFixed(2)}</span>
      )}
    </div>
  );
};

export const ImageCell = ({
  src,
  alt,
}: {
  src?: string | string[];
  alt: string;
}) => {
  const imageSrc = Array.isArray(src) ? src[0] : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className="h-10 w-10 rounded-md object-cover"
    />
  );
};

export const CategoryBadge = ({ name }: { name: string }) => (
  <Badge variant="outline">{name}</Badge>
);

export const DateCell = ({ date }: { date: string | Date }) => {
  const formattedDate = new Date(date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return <span className="text-sm text-muted-foreground">{formattedDate}</span>;
};
