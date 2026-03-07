import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload, Loader2 } from 'lucide-react';

interface ImageReplaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUrl: string;
  label: string;
  onReplace: (file: File) => Promise<void>;
}

export default function ImageReplaceModal({ open, onOpenChange, currentUrl, label, onReplace }: ImageReplaceModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await onReplace(file);
      onOpenChange(false);
      setFile(null);
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Replace Image — {label}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-video rounded-xl overflow-hidden bg-lightgreen/20">
            <img src={preview || currentUrl} alt={label} className="w-full h-full object-cover" />
          </div>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <button onClick={() => inputRef.current?.click()} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-primary/30 rounded-xl py-3 text-primary hover:border-primary transition-colors">
            <Upload className="w-4 h-4" /> Select New Image
          </button>
          {file && (
            <button onClick={handleUpload} disabled={uploading} className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 disabled:opacity-50 flex items-center justify-center gap-2">
              {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : 'Upload & Replace'}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
