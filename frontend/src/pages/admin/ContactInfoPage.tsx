import { useForm } from 'react-hook-form';
import { useContactInfo, useUpdateContact } from '@/hooks/useContactInfo';
import { toast } from 'sonner';
import type { ContactInfo } from '@/lib/mockData';
import { useEffect } from 'react';

export default function ContactInfoPage() {
  const { data: contact, isLoading } = useContactInfo();
  const updateMutation = useUpdateContact();

  const { register, handleSubmit, reset } = useForm<ContactInfo>();

  useEffect(() => {
    if (contact) reset(contact);
  }, [contact, reset]);

  const onSubmit = async (vals: ContactInfo) => {
    try {
      await updateMutation.mutateAsync(vals);
      toast.success('Contact info updated');
    } catch {
      toast.error('Failed to update');
    }
  };

  if (isLoading) return <p className="text-textmuted">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-heading font-bold text-darkgreen mb-1">Contact & Donation Info</h2>
      <p className="text-sm text-textmuted mb-6">Manage public contact and tax information</p>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow p-6 space-y-6">
        <div>
          <h3 className="font-heading font-bold text-darkgreen mb-3">Contact Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-textmuted mb-1">Contact Person Name</label>
              <input {...register('contactPersonName')} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-textmuted mb-1">Contact Person Title</label>
              <input {...register('contactPersonTitle')} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-textmuted mb-1">Email</label>
              <input {...register('email')} type="email" className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-textmuted mb-1">Phone</label>
              <input {...register('phone')} type="tel" className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold text-darkgreen mb-3">Address</h3>
          <textarea {...register('address')} rows={3} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
        </div>

        <div>
          <h3 className="font-heading font-bold text-darkgreen mb-3">Tax & Donation Note</h3>
          <textarea {...register('taxNote')} rows={3} className="w-full border border-lightgreen rounded-lg px-3 py-2 text-sm" />
        </div>

        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90">
          Save Changes
        </button>
      </form>
    </div>
  );
}
