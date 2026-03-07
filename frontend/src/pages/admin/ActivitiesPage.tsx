import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActivities, useDeleteActivity, useTogglePublish } from '@/hooks/useActivities';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Eye, EyeOff, Pencil, Trash2, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const filterTabs = ['All', 'Published', 'Drafts'];

export default function ActivitiesPage() {
  const { data: activities, isLoading } = useActivities(true);
  const deleteMutation = useDeleteActivity();
  const toggleMutation = useTogglePublish();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = activities?.filter(a => {
    if (filter === 'Published') return a.published;
    if (filter === 'Drafts') return !a.published;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-bold text-darkgreen">Activities</h2>
        <button onClick={() => navigate('/admin/activities/new')} className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90">
          New Activity
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {filterTabs.map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === t ? 'bg-primary text-white' : 'bg-white text-textdark hover:bg-lightgreen/50'}`}>
            {t}
          </button>
        ))}
      </div>

      {isLoading ? <p className="text-textmuted">Loading...</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered?.map(a => (
            <div key={a.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {a.images[0] ? (
                <img src={a.images[0].url} alt={a.title} className="aspect-video w-full object-cover" />
              ) : (
                <div className="aspect-video w-full bg-lightgreen/20 flex items-center justify-center"><ImageIcon className="w-10 h-10 text-textmuted/30" /></div>
              )}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded">{a.category}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${a.published ? 'bg-primary/10 text-primary' : 'bg-textmuted/10 text-textmuted'}`}>
                    {a.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-darkgreen text-sm">{a.title}</h3>
                <p className="text-xs text-textmuted">{new Date(a.date).toLocaleDateString('en-IN')}</p>
                <p className="text-xs text-textmuted flex items-center gap-1"><ImageIcon className="w-3 h-3" /> {a.images.length} photos</p>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => navigate(`/admin/activities/edit/${a.id}`)} className="text-primary hover:bg-primary/10 p-1.5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteId(a.id)} className="text-accent hover:bg-accent/10 p-1.5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  <button
                    onClick={async () => {
                      try { await toggleMutation.mutateAsync(a.id); toast.success('Status toggled'); } catch { toast.error('Failed'); }
                    }}
                    className="text-textmuted hover:bg-lightgreen/30 p-1.5 rounded-lg"
                  >
                    {a.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Activity"
        description="This will permanently remove this activity and all its photos."
        onConfirm={async () => {
          if (deleteId) {
            try { await deleteMutation.mutateAsync(deleteId); toast.success('Activity deleted'); } catch { toast.error('Failed'); }
          }
          setDeleteId(null);
        }}
      />
    </div>
  );
}
