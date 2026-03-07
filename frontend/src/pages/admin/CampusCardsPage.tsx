import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCampuses, useUpdateCampus, useReplaceCampusImage } from '@/hooks/useCampuses';
import ImageReplaceModal from '@/components/admin/ImageReplaceModal';
import { toast } from 'sonner';
import type { Campus } from '@/lib/mockData';

function CampusCard({ campus }: { campus: Campus }) {
  const updateMutation = useUpdateCampus();
  const replaceMutation = useReplaceCampusImage();
  const [imgModal, setImgModal] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: campus.title,
      subtitle: campus.subtitle,
      description: campus.description,
      boys: campus.stats?.boys || 0,
      girls: campus.stats?.girls || 0,
      teachers: campus.stats?.teachers || 0,
      head: campus.stats?.head || '',
    },
  });

  const onSubmit = async (vals: Record<string, unknown>) => {
    try {
      const body: Partial<Campus> = {
        title: vals.title as string,
        subtitle: vals.subtitle as string,
        description: vals.description as string,
      };
      if (campus.hasStats) {
        body.stats = {
          boys: Number(vals.boys),
          girls: Number(vals.girls),
          teachers: Number(vals.teachers),
          head: vals.head as string,
        };
      }
      await updateMutation.mutateAsync({ slug: campus.slug, body });
      toast.success('Campus updated successfully');
    } catch {
      toast.error('Failed to update campus');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="relative">
        <img src={campus.image.url} alt={campus.title} className="aspect-video w-full object-cover" />
        <button onClick={() => setImgModal(true)} className="absolute bottom-3 right-3 bg-white/90 text-accent text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-white">
          Replace Image
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-textmuted mb-1">Title</label>
          <input {...register('title')} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-textmuted mb-1">Subtitle</label>
          <input {...register('subtitle')} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-textmuted mb-1">Description</label>
          <textarea {...register('description')} rows={3} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
        </div>
        {campus.hasStats && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-textmuted mb-1">Boys</label>
              <input {...register('boys', { valueAsNumber: true })} type="number" className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-textmuted mb-1">Girls</label>
              <input {...register('girls', { valueAsNumber: true })} type="number" className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-textmuted mb-1">Teachers</label>
              <input {...register('teachers', { valueAsNumber: true })} type="number" className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-textmuted mb-1">Head</label>
              <input {...register('head')} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
        )}
        <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary/90">
          Save Changes
        </button>
      </form>
      <ImageReplaceModal
        open={imgModal}
        onOpenChange={setImgModal}
        currentUrl={campus.image.url}
        label={campus.title}
        onReplace={async (file) => {
          try {
            await replaceMutation.mutateAsync({ slug: campus.slug, file });
            toast.success('Image replaced');
          } catch {
            toast.error('Failed to replace image');
          }
        }}
      />
    </div>
  );
}

export default function CampusCardsPage() {
  const { data: campuses, isLoading } = useCampuses(true);

  return (
    <div>
      <h2 className="text-lg font-heading font-bold text-darkgreen mb-1">Campus Cards</h2>
      <p className="text-sm text-textmuted mb-6">Edit details for each building</p>
      {isLoading ? (
        <div className="text-textmuted">Loading...</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {campuses?.map(c => <CampusCard key={c.slug} campus={c} />)}
        </div>
      )}
    </div>
  );
}
