import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { mockContact, type ContactInfo } from '@/lib/mockData';

export function useContactInfo() {
  return useQuery<ContactInfo>({
    queryKey: ['contact'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/api/public/contact');
        return data.data ?? data;
      } catch {
        return mockContact;
      }
    },
  });
}

export function useUpdateContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: ContactInfo) => {
      const { data } = await api.put('/api/admin/contact', body);
      return data.data ?? data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contact'] }),
  });
}
