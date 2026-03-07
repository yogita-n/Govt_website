import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { mockCampuses, type Campus } from '@/lib/mockData';

export function useCampuses(isAdmin = false) {
  const base = isAdmin ? '/api/admin/campuses' : '/api/public/campuses';
  return useQuery<Campus[]>({
    queryKey: ['campuses', isAdmin],
    queryFn: async () => {
      try {
        const { data } = await api.get(base);
        return data.data ?? data;
      } catch {
        return mockCampuses;
      }
    },
  });
}

export function useUpdateCampus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, body }: { slug: string; body: Partial<Campus> }) => {
      const { data } = await api.put(`/api/admin/campuses/${slug}`, body);
      return data.data ?? data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['campuses'] }),
  });
}

export function useReplaceCampusImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, file }: { slug: string; file: File }) => {
      const fd = new FormData();
      fd.append('image', file);
      const { data } = await api.put(`/api/admin/campuses/${slug}/image`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data ?? data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['campuses'] }),
  });
}
