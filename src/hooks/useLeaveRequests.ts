import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface LeaveRequest {
  id: string;
  user_id: string;
  employee_name: string;
  leave_type: string;
  from_date: string;
  to_date: string;
  days: number;
  reason: string | null;
  status: string;
  created_at: string;
}

export function useLeaveRequests() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: leaves = [], isLoading } = useQuery({
    queryKey: ["leave-requests", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leave_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as LeaveRequest[];
    },
    enabled: !!user,
  });

  const applyLeave = useMutation({
    mutationFn: async (leave: {
      employee_name: string;
      leave_type: string;
      from_date: string;
      to_date: string;
      days: number;
      reason: string;
    }) => {
      const { error } = await supabase.from("leave_requests").insert({
        ...leave,
        user_id: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave-requests"] });
      toast.success("Leave request submitted!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("leave_requests")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave-requests"] });
      toast.success("Leave status updated!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteLeave = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leave_requests").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave-requests"] });
      toast.success("Leave request deleted!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const stats = {
    approved: leaves.filter((l) => l.status === "Approved").length,
    pending: leaves.filter((l) => l.status === "Pending").length,
    rejected: leaves.filter((l) => l.status === "Rejected").length,
  };

  return { leaves, isLoading, applyLeave, updateStatus, deleteLeave, stats };
}
