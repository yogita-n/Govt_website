export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="aspect-video bg-lightgreen/40" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-lightgreen/40 rounded w-3/4" />
        <div className="h-3 bg-lightgreen/30 rounded w-1/2" />
        <div className="h-3 bg-lightgreen/20 rounded w-full" />
        <div className="h-3 bg-lightgreen/20 rounded w-5/6" />
      </div>
    </div>
  );
}
