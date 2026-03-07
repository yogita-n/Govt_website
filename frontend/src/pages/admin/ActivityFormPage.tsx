import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useActivities,
  useCreateActivity,
  useUpdateActivity,
  useUploadActivityImages,
  useDeleteActivityImage,
} from '@/hooks/useActivities';
import { Upload, X, ArrowLeft, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  title: string;
  date: string;
  category: string;
  description: string;
  published: boolean;
}

export default function ActivityFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: activities } = useActivities(true);
  const createMutation = useCreateActivity();
  const updateMutation = useUpdateActivity();
  const uploadImagesMutation = useUploadActivityImages();
  const deleteImageMutation = useDeleteActivityImage();
  const fileRef = useRef<HTMLInputElement>(null);

  // _id from MongoDB (via id virtual after our fix) or the url param
  const existing = id ? activities?.find(a => (a as any)._id === id || a.id === id) : null;
  const isEdit = !!existing;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: existing?.title || '',
      date: existing?.date
        ? new Date(existing.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      category: existing?.category || 'Cultural',
      description: existing?.description || '',
      published: existing?.published ?? false,
    },
  });

  const [selectedFiles, setSelectedFiles] = useState<{ file: File; preview: string; caption: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map(f => ({ file: f, preview: URL.createObjectURL(f), caption: '' }));
    setSelectedFiles(prev => [...prev, ...newFiles]);
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const onSubmit = async (vals: FormData) => {
    try {
      setUploading(true);
      let activityId: string;

      if (isEdit) {
        const updated = await updateMutation.mutateAsync({
          id: id!,
          body: { title: vals.title, date: vals.date, category: vals.category, description: vals.description, published: vals.published },
        });
        activityId = (updated as any)?._id || (updated as any)?.id || id!;
      } else {
        const created = await createMutation.mutateAsync(vals);
        activityId = (created as any)?._id || (created as any)?.id;
      }

      // Upload any newly selected images
      if (selectedFiles.length > 0) {
        await uploadImagesMutation.mutateAsync({
          id: activityId,
          files: selectedFiles.map(sf => sf.file),
        });
      }

      toast.success(isEdit ? 'Activity updated' : 'Activity created');
      navigate('/admin/activities');
    } catch (err) {
      console.error(err);
      toast.error('Operation failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteExistingImage = async (imageIndex: number) => {
    if (!id) return;
    try {
      await deleteImageMutation.mutateAsync({ id, imageIndex });
      toast.success('Image removed');
    } catch {
      toast.error('Failed to remove image');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate('/admin/activities')} className="flex items-center gap-2 text-sm text-textmuted hover:text-textdark mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Activities
      </button>

      <h2 className="text-lg font-heading font-bold text-darkgreen mb-6">{isEdit ? 'Edit Activity' : 'New Activity'}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-textdark mb-1">Title *</label>
          <input {...register('title', { required: 'Title is required' })} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
          {errors.title && <p className="text-accent text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-textdark mb-1">Date</label>
            <input {...register('date')} type="date" className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textdark mb-1">Category</label>
            <select {...register('category')} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm">
              {['Cultural', 'Academic', 'Sports', 'Infrastructure', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-textdark mb-1">Description</label>
          <textarea {...register('description')} rows={4} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
        </div>

        <div className="flex items-center gap-2">
          <input {...register('published')} type="checkbox" id="published" className="rounded" />
          <label htmlFor="published" className="text-sm text-textdark">Published</label>
        </div>

        {/* Existing images (edit mode) */}
        {isEdit && existing?.images && existing.images.length > 0 && (
          <div>
            <h3 className="font-heading font-bold text-darkgreen mb-3 text-sm">Current Images</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {existing.images.map((img, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden group">
                  <img src={img.url} alt={img.caption} className="aspect-video w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleDeleteExistingImage(i)}
                    className="absolute top-1 right-1 bg-accent text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  {img.caption && <p className="text-xs text-textmuted p-1 truncate">{img.caption}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New image upload */}
        <div>
          <h3 className="font-heading font-bold text-darkgreen mb-3 text-sm">
            {isEdit ? 'Add More Images' : 'Images'}
          </h3>

          <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-primary/30 rounded-xl py-4 text-primary hover:border-primary transition-colors"
          >
            <Upload className="w-4 h-4" /> Select Images
          </button>

          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {selectedFiles.map((sf, i) => (
                <div key={i} className="relative">
                  <img src={sf.preview} alt="" className="aspect-video w-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setSelectedFiles(prev => prev.filter((_, j) => j !== i))}
                    className="absolute top-1 right-1 bg-accent text-white rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <input
                    placeholder="Caption (optional)"
                    value={sf.caption}
                    onChange={e => setSelectedFiles(prev => prev.map((s, j) => j === i ? { ...s, caption: e.target.value } : s))}
                    className="w-full mt-1 border border-lightgreen rounded px-2 py-1 text-xs"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
        >
          {uploading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Activity'}
        </button>
      </form>
    </div>
  );
}
