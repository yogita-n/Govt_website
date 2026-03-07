import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDonors, useCreateDonor, useUpdateDonor, useDeleteDonor } from '@/hooks/useDonors';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Donor } from '@/lib/mockData';

interface DonorFormData {
  name: string;
  location: string;
  type: string;
  order: number;
  isActive: boolean;
}

function DonorDrawer({ donor, onClose }: { donor: Partial<Donor> | null; onClose: () => void }) {
  const createMutation = useCreateDonor();
  const updateMutation = useUpdateDonor();
  const isEdit = !!donor?.id;

  const { register, handleSubmit, formState: { errors } } = useForm<DonorFormData>({
    defaultValues: {
      name: donor?.name || '',
      location: donor?.location || '',
      type: donor?.type || 'Individual',
      order: donor?.order || 1,
      isActive: donor?.isActive ?? true,
    },
  });

  const onSubmit = async (vals: DonorFormData) => {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: donor!.id!, body: vals });
      } else {
        await createMutation.mutateAsync(vals as Omit<Donor, 'id'>);
      }
      toast.success(isEdit ? 'Donor updated' : 'Donor created');
      onClose();
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-[400px] bg-white shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-5 border-b">
        <h3 className="font-heading font-bold text-darkgreen">{isEdit ? 'Edit Donor' : 'Add Donor'}</h3>
        <button onClick={onClose}><X className="w-5 h-5 text-textmuted" /></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-5 space-y-4 overflow-y-auto">
        <div>
          <label className="block text-sm font-medium text-textdark mb-1">Name *</label>
          <input {...register('name', { required: 'Name is required' })} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
          {errors.name && <p className="text-accent text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-textdark mb-1">Location</label>
          <input {...register('location')} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-textdark mb-1">Type</label>
          <select {...register('type')} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm">
            <option value="Institutional">Institutional</option>
            <option value="Individual">Individual</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-textdark mb-1">Order</label>
          <input {...register('order', { valueAsNumber: true })} type="number" className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <input {...register('isActive')} type="checkbox" id="isActive" className="rounded" />
          <label htmlFor="isActive" className="text-sm text-textdark">Active</label>
        </div>
        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onClose} className="flex-1 border border-lightgreen rounded-lg py-2.5 text-sm hover:bg-lightgreen/20">Cancel</button>
          <button type="submit" className="flex-1 bg-primary text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-primary/90">Save Donor</button>
        </div>
      </form>
    </div>
  );
}

export default function DonorsPage() {
  const { data: donors, isLoading } = useDonors(true);
  const deleteMutation = useDeleteDonor();
  const [drawer, setDrawer] = useState<Partial<Donor> | null | 'new'>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const activeCount = donors?.filter(d => d.isActive).length || 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-heading font-bold text-darkgreen">Donors</h2>
          {donors && <p className="text-sm text-textmuted">{donors.length} Donors · {activeCount} Active</p>}
        </div>
        <button onClick={() => setDrawer('new')} className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90">
          Add Donor
        </button>
      </div>

      {isLoading ? <p className="text-textmuted">Loading...</p> : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-lightgreen/20 text-left">
                  <th className="px-4 py-3 font-medium text-textmuted">#</th>
                  <th className="px-4 py-3 font-medium text-textmuted">Name</th>
                  <th className="px-4 py-3 font-medium text-textmuted">Location</th>
                  <th className="px-4 py-3 font-medium text-textmuted">Type</th>
                  <th className="px-4 py-3 font-medium text-textmuted">Active</th>
                  <th className="px-4 py-3 font-medium text-textmuted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors?.map((d, i) => (
                  <tr key={d.id} className="border-t border-lightgreen/20 hover:bg-lightgreen/5">
                    <td className="px-4 py-3 text-textmuted">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-textdark">{d.name}</td>
                    <td className="px-4 py-3 text-textmuted">{d.location}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded ${d.type === 'Institutional' ? 'bg-primary/10 text-primary' : 'bg-lightgreen/40 text-darkgreen'}`}>{d.type}</span></td>
                    <td className="px-4 py-3"><span className={`w-2 h-2 rounded-full inline-block ${d.isActive ? 'bg-primary' : 'bg-textmuted/30'}`} /></td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => setDrawer(d)} className="text-primary hover:bg-primary/10 p-1.5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteId(d.id)} className="text-accent hover:bg-accent/10 p-1.5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {drawer !== null && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setDrawer(null)} />
          <DonorDrawer donor={drawer === 'new' ? {} : drawer} onClose={() => setDrawer(null)} />
        </>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Donor"
        description="Are you sure you want to remove this donor?"
        onConfirm={async () => {
          if (deleteId) {
            try {
              await deleteMutation.mutateAsync(deleteId);
              toast.success('Donor deleted');
            } catch {
              toast.error('Failed to delete');
            }
          }
          setDeleteId(null);
        }}
      />
    </div>
  );
}
