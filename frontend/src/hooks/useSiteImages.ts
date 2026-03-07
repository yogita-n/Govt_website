import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { mockSiteImages, type SiteImage } from '@/lib/mockData';

export function useSiteImages(isAdmin = false) {
  const base = isAdmin ? '/api/admin/site-images' : '/api/public/site-images';
  return useQuery<SiteImage[]>({
    queryKey: ['site-images', isAdmin],
    queryFn: async () => {
      try {
        const { data } = await api.get(base);
        return data.data ?? data;
      } catch {
        return mockSiteImages;
      }
    },
  });
}

export function useReplaceSiteImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, file }: { key: string; file: File }) => {
      const fd = new FormData();
      fd.append('image', file);
      const { data } = await api.put(`/api/admin/site-images/${key}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data ?? data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['site-images'] }),
  });
}
