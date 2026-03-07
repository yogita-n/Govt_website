import { useState } from 'react';
import { useSiteImages, useReplaceSiteImage } from '@/hooks/useSiteImages';
import ImageReplaceModal from '@/components/admin/ImageReplaceModal';
import { toast } from 'sonner';

export default function SiteImagesPage() {
  const { data: images, isLoading } = useSiteImages(true);
  const replaceMutation = useReplaceSiteImage();
  const [modal, setModal] = useState<{ key: string; url: string; label: string } | null>(null);

  const handleReplace = async (file: File) => {
    if (!modal) return;
    try {
      await replaceMutation.mutateAsync({ key: modal.key, file });
      toast.success('Image replaced successfully');
    } catch {
      toast.error('Failed to replace image');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-heading font-bold text-darkgreen mb-1">Site Images</h2>
      <p className="text-sm text-textmuted mb-6">Manage replaceable images across the website</p>

      {isLoading ? (
        <div className="text-textmuted">Loading...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images?.map(img => (
            <div key={img.key} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img src={img.url} alt={img.label} className="aspect-video w-full object-cover" />
              <div className="p-4 space-y-2">
                <span className="inline-block bg-lightgreen/40 text-primary text-xs font-semibold px-2 py-0.5 rounded">{img.section}</span>
                <p className="font-medium text-sm text-textdark">{img.label}</p>
                <button onClick={() => setModal({ key: img.key, url: img.url, label: img.label })} className="text-sm border border-accent text-accent rounded-lg px-4 py-1.5 hover:bg-accent hover:text-white transition-colors">
                  Replace Image
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <ImageReplaceModal open={!!modal} onOpenChange={() => setModal(null)} currentUrl={modal.url} label={modal.label} onReplace={handleReplace} />
      )}
    </div>
  );
}
