import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Activity } from '@/lib/mockData';

export function useActivities(isAdmin = false) {
  const base = isAdmin ? '/api/admin/activities' : '/api/public/activities';
  return useQuery<Activity[]>({
    queryKey: ['activities', isAdmin],
    queryFn: async () => {
      try {
        const { data } = await api.get(base);
        return data.data ?? data;
      } catch {
        return [];
      }
    },
  });
}

export function useCreateActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: Omit<Activity, 'id' | 'images'>) => {
      const { data } = await api.post('/api/admin/activities', body);
      return data.data ?? data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['activities'] }),
  });
}

export function useUpdateActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: Partial<Activity> }) => {
      const { data } = await api.put(`/api/admin/activities/${id}`, body);
      return data.data ?? data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['activities'] }),
  });
}

export function useDeleteActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/admin/activities/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['activities'] }),
  });
}

export function useTogglePublish() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.put(`/api/admin/activities/${id}/publish`);
      return data.data ?? data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['activities'] }),
  });
}

export function useUploadActivityImages() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, files }: { id: string; files: File[] }) => {
      const fd = new FormData();
      files.forEach(f => fd.append('images', f));
      const { data } = await api.post(`/api/admin/activities/${id}/images`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data ?? data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['activities'] }),
  });
}

export function useDeleteActivityImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, imageIndex }: { id: string; imageIndex: number }) => {
      await api.delete(`/api/admin/activities/${id}/images/${imageIndex}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['activities'] }),
  });
}
