import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { mockDonors, type Donor } from '@/lib/mockData';

export function useDonors(isAdmin = false) {
  const base = isAdmin ? '/api/admin/donors' : '/api/public/donors';
  return useQuery<Donor[]>({
    queryKey: ['donors', isAdmin],
    queryFn: async () => {
      try {
        const { data } = await api.get(base);
        return data.data ?? data;
      } catch {
        return isAdmin ? mockDonors : mockDonors.filter(d => d.isActive).sort((a, b) => a.order - b.order);
      }
    },
  });
}

export function useCreateDonor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: Omit<Donor, 'id'>) => {
      const { data } = await api.post('/api/admin/donors', body);
      return data.data ?? data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['donors'] }),
  });
}

export function useUpdateDonor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: Partial<Donor> }) => {
      const { data } = await api.put(`/api/admin/donors/${id}`, body);
      return data.data ?? data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['donors'] }),
  });
}

export function useDeleteDonor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/admin/donors/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['donors'] }),
  });
}
