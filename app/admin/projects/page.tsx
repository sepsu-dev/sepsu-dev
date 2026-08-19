"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Save, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Attachment,
  AttachmentContent,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from "@/components/ui/attachment";
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

interface Project {
  uid: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  sort_order: number;
}

const emptyForm = {
  uid: "",
  title: "",
  description: "",
  image_url: "",
  tags: "",
  sort_order: 0,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "projects");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setForm((prev) => ({ ...prev, image_url: data.url }));
      toast.success("Image uploaded to R2 successfully!");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      if (!res.ok) throw new Error("Failed to load data");
      const data = await res.json();
      setProjects(data.projects);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags,
          sort_order: Number(form.sort_order) || 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      toast.success("Project saved successfully");
      setForm(emptyForm);
      setEditing(null);
      setOpen(false);
      load();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleDelete = async (uid: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${encodeURIComponent(uid)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Project deleted successfully");
      load();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const startEdit = (p: Project) => {
    setEditing(p);
    setForm({
      uid: p.uid,
      title: p.title,
      description: p.description,
      image_url: p.image_url,
      tags: p.tags.join(", "),
      sort_order: p.sort_order,
    });
    setOpen(true);
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
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  // Adjust current page if projects shrink
  useEffect(() => {
    if (currentPage > 1 && currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [projects.length, totalPages, currentPage]);

  return (
    <div className="w-full space-y-6 py-2 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage list of projects displayed on the landing page.
          </p>
        </div>
        <Button onClick={() => { setEditing(null); setForm(emptyForm); setOpen(true); }} size="sm" className="w-full sm:w-auto shadow-xs">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-md w-full flex flex-col h-full overflow-y-auto p-6">
          <SheetHeader className="p-0">
            <SheetTitle>
              {editing ? "Edit Project" : "Add Project"}
            </SheetTitle>
            <SheetDescription>
              {editing
                ? "Update existing project information."
                : "Fill in the form to add a new project."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="flex-1 space-y-4 py-2 pb-6">
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="uid">UID (slug)</FieldLabel>
                <Input
                  id="uid"
                  placeholder="project-name"
                  value={form.uid}
                  disabled={!!editing}
                  onChange={(e) => setForm({ ...form, uid: e.target.value })}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="title">Project Title</FieldLabel>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <textarea
                  id="description"
                  placeholder="Short description of the project..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Cover Image</FieldLabel>
                <div className="space-y-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                  />
                  {uploading && <p className="text-xs text-muted-foreground animate-pulse">Uploading...</p>}
                  {form.image_url && (
                    <Attachment>
                      <AttachmentMedia>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={form.image_url}
                          alt="Cover preview"
                          className="h-full w-full object-cover"
                        />
                      </AttachmentMedia>
                      <AttachmentContent>
                        <AttachmentTitle>Cover Project</AttachmentTitle>
                        <AttachmentDescription className="truncate max-w-[180px]">
                          {form.image_url}
                        </AttachmentDescription>
                      </AttachmentContent>
                      <AttachmentActions>
                        <AttachmentAction
                          variant="ghost"
                          size="icon"
                          onClick={() => setForm((prev) => ({ ...prev, image_url: "" }))}
                          title="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </AttachmentAction>
                      </AttachmentActions>
                    </Attachment>
                  )}
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="tags">Tags (comma-separated)</FieldLabel>
                <Input
                  id="tags"
                  placeholder="Next.js, TypeScript, Tailwind CSS"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="sort_order">Display Order</FieldLabel>
                <Input
                  id="sort_order"
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                />
              </Field>
              <div className="pt-4 border-t">
                <ButtonGroup className="w-full justify-end">
                  <Button type="submit" className="flex-1 sm:flex-initial">
                    <Save className="mr-2 h-4 w-4" />
                    {editing ? "Update" : "Save"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 sm:flex-initial"
                    onClick={() => {
                      setOpen(false);
                      setEditing(null);
                      setForm(emptyForm);
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

      <Card className="border-border/60 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">Project List ({projects.length})</CardTitle>
          <CardDescription>All projects stored in the database.</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">No projects yet.</p>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="w-[100px] text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Image</TableHead>
                      <TableHead className="w-[200px] text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Project</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Description</TableHead>
                      <TableHead className="w-[220px] text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Tags</TableHead>
                      <TableHead className="w-[80px] text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Display Order</TableHead>
                      <TableHead className="w-[100px] text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedProjects.map((p) => (
                      <TableRow key={p.uid} className="hover:bg-muted/20">
                        <TableCell>
                          <div className="relative h-10 w-16 overflow-hidden rounded-lg border border-border/50 bg-muted flex items-center justify-center">
                            {p.image_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={p.image_url}
                                alt={p.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-[9px] text-muted-foreground font-mono">NO_IMG</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm font-semibold text-foreground">{p.title}</div>
                            <div className="text-[11px] text-muted-foreground font-mono">{p.uid}</div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[250px] truncate text-muted-foreground text-xs">
                          {p.description || "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {p.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-lg bg-secondary/70 border border-border/20 px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-mono text-xs font-semibold">{p.sort_order}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                              onClick={() => startEdit(p)}
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDelete(p.uid)}
                              title="Delete"
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
                      {Math.min(startIndex + itemsPerPage, projects.length)}
                    </span>{" "}
                    of <span className="font-medium text-foreground">{projects.length}</span> projects
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
                      Halaman {currentPage} dari {totalPages}
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
    </div>
  );
}