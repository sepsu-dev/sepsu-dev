"use client";

import React, { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";

interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    itemName: string;
    itemLabel?: string;
    onConfirm: () => void;
    loading?: boolean;
}

export function DeleteConfirmDialog({
    open,
    onOpenChange,
    itemName,
    itemLabel = "item",
    onConfirm,
    loading = false,
}: DeleteConfirmDialogProps) {
    const [confirmText, setConfirmText] = useState("");

    // Reset input when dialog opens/closes
    useEffect(() => {
        if (!open) {
            setConfirmText("");
        }
    }, [open]);

    const canConfirm = confirmText === itemName && !loading;

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus {itemLabel}</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-4">
                        <span>
                            Tindakan ini <strong>tidak dapat dibatalkan</strong>.{" "}
                            {itemLabel} <strong>{itemName}</strong> akan dihapus secara permanen.
                        </span>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">
                                Ketik <code className="rounded bg-muted px-1 py-0.5 text-xs">{itemName}</code> untuk mengonfirmasi:
                            </label>
            <input
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder={itemName}
                                disabled={loading}
                                autoFocus
                                className={cn(
                                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                                    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                                    "placeholder:text-muted-foreground",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                    "disabled:cursor-not-allowed disabled:opacity-50",
                                )}
                            />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={!canConfirm}
                        variant="destructive"
                    >
                        {loading ? "Menghapus..." : `Hapus ${itemLabel}`}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}