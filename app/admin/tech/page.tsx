"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { RefreshCw, Save, Plus, Trash2, X, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { IconSelect } from "@/components/ui/icon-select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TechCategory {
  id?: number;
  name: string;
  icon: string;
  sort_order: number;
}

interface TechItem {
  id?: number;
  category_id?: number;
  category_name?: string;
  name: string;
  icon: string;
}

export default function TechItemsPage() {
  const [categories, setCategories] = useState<TechCategory[]>([]);
  const [items, setItems] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Sheet states
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TechItem | null>(null);
  const [itemName, setItemName] = useState("");
  const [itemCategoryName, setItemCategoryName] = useState("");
  const [itemIcon, setItemIcon] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tech");
      if (!res.ok) throw new Error("Failed to load data");
      const data = await res.json();
      setCategories(data.tech?.categories ?? []);
      setItems(data.tech?.items ?? []);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startAdd = () => {
    if (categories.length === 0) {
      toast.error("Please create a tech stack category first in the Categories menu");
      return;
    }
    setEditingItem(null);
    setItemName("");
    setItemCategoryName(categories[0].name);
    setItemIcon("");
    setOpen(true);
  };

  const startEdit = (item: TechItem) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemCategoryName(item.category_name || "");
    setItemIcon(item.icon);
    setOpen(true);
  };

  const removeItem = async (targetItem: TechItem) => {
    if (!confirm(`Delete technology "${targetItem.name}" from category "${targetItem.category_name}"?`)) return;
    
    const updatedItems = items.filter(
      (i) => !(i.name === targetItem.name && i.category_name === targetItem.category_name)
    );

    setSaving(true);
    try {
      const res = await fetch("/api/admin/tech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories, items: updatedItems }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setCategories(data.tech?.categories ?? categories);
      setItems(data.tech?.items ?? updatedItems);
      toast.success("Technology deleted successfully");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = itemName.trim();
    if (!cleanName) {
      toast.error("Technology name cannot be empty");
      return;
    }
    if (!itemCategoryName) {
      toast.error("Please select a category");
      return;
    }

    // Validasi duplikasi di kategori tujuan
    const isDuplicate = items.some(
      (i) => i.name.toLowerCase() === cleanName.toLowerCase() && 
      i.category_name === itemCategoryName &&
      !(editingItem && editingItem.name.toLowerCase() === cleanName.toLowerCase() && editingItem.category_name === itemCategoryName)
    );

    if (isDuplicate) {
      toast.error(`Technology "${cleanName}" already exists in category "${itemCategoryName}"`);
      return;
    }

    setSaving(true);
    try {
      let updatedItems = [...items];

      if (editingItem) {
        // Mode edit: map item lama dengan yang baru
        updatedItems = updatedItems.map((i) => {
          if (i.name === editingItem.name && i.category_name === editingItem.category_name) {
            return { ...i, name: cleanName, category_name: itemCategoryName, icon: itemIcon.trim() };
          }
          return i;
        });
      } else {
        // Mode tambah baru
        updatedItems.push({
          name: cleanName,
          category_name: itemCategoryName,
          icon: itemIcon.trim(),
        });
      }

      const res = await fetch("/api/admin/tech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories, items: updatedItems }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setCategories(data.tech?.categories ?? categories);
      setItems(data.tech?.items ?? updatedItems);
      toast.success("Technology saved successfully");
      setOpen(false);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        Loading data...
      </div>
    );
  }

  // Paginated items
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  // Adjust current page if items shrink
  useEffect(() => {
    if (currentPage > 1 && currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [items.length, totalPages, currentPage]);

  return (
    <div className="w-full space-y-6 py-2 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tech Stack</h1>
          <p className="text-sm text-muted-foreground">
            Manage technology stack items and their visual icons.
          </p>
        </div>
        <Button onClick={startAdd} size="sm" className="w-full sm:w-auto shadow-xs">
          <Plus className="mr-2 h-4 w-4" />
          Add Technology
        </Button>
      </div>

      <Card className="border-border/60 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">Technology List ({items.length})</CardTitle>
          <CardDescription>All registered technology stack items with their categories and icons.</CardDescription>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">No technology items yet.</p>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="w-[180px] text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Icon Slug / URL</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Technology Name</TableHead>
                      <TableHead className="w-[200px] text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Category</TableHead>
                      <TableHead className="w-[100px] text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedItems.map((item) => (
                      <TableRow key={`${item.category_name}-${item.name}`} className="hover:bg-muted/20">
                        <TableCell className="font-mono text-xs">
                          {item.icon ? (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-foreground border border-border/40 max-w-[150px] truncate">
                              <Icon name={item.icon} size={14} />
                              {item.icon}
                            </span>
                          ) : (
                            <span className="text-muted-foreground italic text-[11px]">—</span>
                          )}
                        </TableCell>
                        <TableCell className="font-semibold text-sm text-foreground">
                          {item.name}
                        </TableCell>
                        <TableCell className="capitalize">
                          <span className="inline-flex items-center rounded-lg bg-secondary/70 border border-border/20 px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                            {item.category_name}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                              onClick={() => startEdit(item)}
                              title="Edit Technology"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                              onClick={() => removeItem(item)}
                              title="Delete Technology"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to{" "}
                    <span className="font-medium text-foreground">
                      {Math.min(startIndex + itemsPerPage, items.length)}
                    </span>{" "}
                    of <span className="font-medium text-foreground">{items.length}</span> technologies
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-medium px-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-md w-full flex flex-col h-full overflow-y-auto p-6">
          <SheetHeader className="p-0">
            <SheetTitle>
              {editingItem ? "Edit Technology" : "Add Technology"}
            </SheetTitle>
            <SheetDescription>
              {editingItem
                ? "Modify the name, category, or icon slug for this technology."
                : "Add a new technology stack item with its category and icon."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSave} className="flex-1 space-y-5 py-2 pb-6">
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="item-name">Technology Name</FieldLabel>
                <Input
                  id="item-name"
                  placeholder="e.g. React.js, Tailwind CSS, PostgreSQL"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="item-category">Category</FieldLabel>
                <select
                  id="item-category"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-background dark:text-foreground"
                  value={itemCategoryName}
                  onChange={(e) => setItemCategoryName(e.target.value)}
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name} className="capitalize dark:bg-neutral-900">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="item-icon">Icon Slug (Simple Icons / URL)</FieldLabel>
                <IconSelect
                  id="item-icon"
                  type="brand"
                  placeholder="e.g. react, nextdotjs, postgresql, or image link"
                  value={itemIcon}
                  onChange={(val) => setItemIcon(val)}
                />
                <span className="text-[10px] text-muted-foreground block mt-1">
                  Choose from the popular brands above, type to search, or enter an external image URL.
                </span>
              </Field>

              <div className="pt-4 border-t">
                <ButtonGroup className="w-full justify-end">
                  <Button type="submit" className="flex-1 sm:flex-initial" disabled={saving}>
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 sm:flex-initial"
                    disabled={saving}
                    onClick={() => {
                      setOpen(false);
                      setItemName("");
                      setItemCategoryName("");
                      setItemIcon("");
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </ButtonGroup>
              </div>
            </FieldGroup>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}