"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { RefreshCw, Save, Plus, Trash2, FolderPlus, X, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
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

export default function CategoryTechPage() {
  const [categories, setCategories] = useState<TechCategory[]>([]);
  const [items, setItems] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Sheet states
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TechCategory | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categorySortOrder, setCategorySortOrder] = useState(1);

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
    setEditingCategory(null);
    setCategoryName("");
    setCategoryIcon("");
    setCategorySortOrder(categories.length + 1);
    setOpen(true);
  };

  const startEdit = (cat: TechCategory) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setCategoryIcon(cat.icon);
    setCategorySortOrder(cat.sort_order);
    setOpen(true);
  };

  const removeCategory = async (name: string) => {
    if (!confirm(`Delete category "${name}" and all tech items inside it?`)) return;
    
    const updatedCategories = categories.filter((c) => c.name !== name);
    const updatedItems = items.filter((i) => i.category_name !== name);

    setSaving(true);
    try {
      const res = await fetch("/api/admin/tech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: updatedCategories, items: updatedItems }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setCategories(data.tech?.categories ?? updatedCategories);
      setItems(data.tech?.items ?? updatedItems);
      toast.success("Category deleted successfully");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = categoryName.trim().toLowerCase();
    if (!cleanName) {
      toast.error("Category name cannot be empty");
      return;
    }

    // Validasi duplikasi saat tambah baru
    const isDuplicate = categories.some(
      (c) => c.name.toLowerCase() === cleanName.toLowerCase() && 
      !(editingCategory && editingCategory.name.toLowerCase() === cleanName.toLowerCase())
    );

    if (isDuplicate) {
      toast.error("Category already exists");
      return;
    }

    setSaving(true);
    try {
      let updatedCategories = [...categories];
      let updatedItems = [...items];

      if (editingCategory) {
        // Update kategori lama
        updatedCategories = updatedCategories.map((c) => {
          if (c.name === editingCategory.name) {
            return { ...c, name: cleanName, icon: categoryIcon.trim(), sort_order: Number(categorySortOrder) || 1 };
          }
          return c;
        });

        // Update nama kategori lama pada item-itemnya jika berubah
        if (editingCategory.name !== cleanName) {
          updatedItems = updatedItems.map((i) => {
            if (i.category_name === editingCategory.name) {
              return { ...i, category_name: cleanName };
            }
            return i;
          });
        }
      } else {
        // Tambah baru
        updatedCategories.push({
          name: cleanName,
          icon: categoryIcon.trim(),
          sort_order: Number(categorySortOrder) || 1,
        });
      }

      const res = await fetch("/api/admin/tech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: updatedCategories, items: updatedItems }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setCategories(data.tech?.categories ?? updatedCategories);
      setItems(data.tech?.items ?? updatedItems);
      toast.success("Category saved successfully");
      setOpen(false);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  // Paginated items
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = categories.slice(startIndex, startIndex + itemsPerPage);

  // Adjust current page if categories shrink
  useEffect(() => {
    if (currentPage > 1 && currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [categories.length, totalPages, currentPage]);

  return (
    <div className="w-full space-y-6 py-2 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tech Stack Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage technology categories and their grouping icons for your landing page.
          </p>
        </div>
        <Button onClick={startAdd} size="sm" className="w-full sm:w-auto shadow-xs">
          <FolderPlus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card className="border-border/60 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">Category List ({categories.length})</CardTitle>
          <CardDescription>All saved technology categories.</CardDescription>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">No tech stack categories yet.</p>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="w-[180px] text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Icon Preview</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Category Name</TableHead>
                      <TableHead className="w-[120px] text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Display Order</TableHead>
                      <TableHead className="w-[100px] text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCategories.map((cat) => (
                      <TableRow key={cat.name} className="hover:bg-muted/20">
                        <TableCell className="font-mono text-xs">
                          {cat.icon ? (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-foreground border border-border/40">
                              <Icon name={cat.icon} size={14} />
                              {cat.icon}
                            </span>
                          ) : (
                            <span className="text-muted-foreground italic text-[11px]">—</span>
                          )}
                        </TableCell>
                        <TableCell className="font-semibold capitalize text-sm text-foreground">
                          {cat.name}
                        </TableCell>
                        <TableCell className="text-center font-mono text-xs font-semibold">{cat.sort_order}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                              onClick={() => startEdit(cat)}
                              title="Edit Category"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                              onClick={() => removeCategory(cat.name)}
                              title="Delete Category"
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
                      {Math.min(startIndex + itemsPerPage, categories.length)}
                    </span>{" "}
                    of <span className="font-medium text-foreground">{categories.length}</span> categories
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
              {editingCategory ? "Edit Tech Category" : "Add Tech Category"}
            </SheetTitle>
            <SheetDescription>
              {editingCategory
                ? "Modify the category name, icon, and display order."
                : "Enter a new category name and select its icon."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSave} className="flex-1 space-y-5 py-2 pb-6">
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="category-name">Category Name</FieldLabel>
                <Input
                  id="category-name"
                  placeholder="e.g. frontend, backend, devops"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="category-icon">Icon Name (Lucide)</FieldLabel>
                <IconSelect
                  id="category-icon"
                  type="lucide"
                  placeholder="e.g. Layout, Server, Database, GitBranch"
                  value={categoryIcon}
                  onChange={(val) => setCategoryIcon(val)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="category-sort">Display Order</FieldLabel>
                <Input
                  id="category-sort"
                  type="number"
                  placeholder="1, 2, 3..."
                  value={categorySortOrder}
                  onChange={(e) => setCategorySortOrder(Number(e.target.value))}
                />
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
                      setCategoryName("");
                      setCategoryIcon("");
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
