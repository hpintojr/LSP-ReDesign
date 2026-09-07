import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-mesh-hero p-4">
      <div className="double-bezel w-full max-w-md">
        <div className="double-bezel-inner p-8 text-center">
          <Image
            src="/images/lsp-mark.svg"
            alt="Loan Streamline Pro"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <h2 className="font-display text-2xl font-black text-af-navy">Link Expired or Invalid</h2>
          <p className="mt-3 text-pv-muted">The personalized link you clicked is no longer active or could not be found. You can still start a new Loan Streamline Pro inquiry from the homepage.</p>
          <Link href="/" className="mt-6 inline-block rounded-full bg-af-blue px-8 py-3 font-display font-bold text-white transition-colors hover:bg-af-blue-light">Check My Options</Link>
        </div>
      </div>
    </main>
  );
}
