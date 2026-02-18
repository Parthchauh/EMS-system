import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Department {
  id: string;
  user_id: string;
  name: string;
  head: string | null;
  employee_count: number;
  budget: string | null;
  color_variant: number;
  created_at: string;
  updated_at: string;
}

export type DepartmentInsert = Omit<Department, "id" | "created_at" | "updated_at">;

const COLOR_VARIANTS = [
  "bg-primary/10 text-primary",
  "bg-accent/10 text-accent",
  "bg-warning/10 text-warning",
  "bg-success/10 text-success",
  "bg-destructive/10 text-destructive",
];

export const getColorClass = (variant: number) =>
  COLOR_VARIANTS[variant % COLOR_VARIANTS.length];

export function useDepartments() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("departments")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Department[];
    },
    enabled: !!user,
  });

  const addMutation = useMutation({
    mutationFn: async (dept: Omit<DepartmentInsert, "user_id">) => {
      const { error } = await supabase.from("departments").insert({
        ...dept,
        user_id: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department created");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...rest }: Partial<Department> & { id: string }) => {
      const { error } = await supabase
        .from("departments")
        .update(rest)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department updated");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("departments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department deleted");
    },
    onError: (e: any) => toast.error(e.message),
  });

  return {
    departments: query.data ?? [],
    isLoading: query.isLoading,
    addDepartment: addMutation.mutateAsync,
    updateDepartment: updateMutation.mutateAsync,
    deleteDepartment: deleteMutation.mutateAsync,
    isAdding: addMutation.isPending,
  };
}
