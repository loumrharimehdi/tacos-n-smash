import { Mail } from "lucide-react";

export default function VerifyPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 pt-20 sm:pt-24">
      <div className="w-full text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white">
          <Mail size={22} />
        </div>
        <h1 className="mt-4 text-3xl font-black">Vérifie ton email</h1>
        <p className="mt-2 text-sm text-brand-brown/60">
          Un lien de connexion t'a été envoyé. Clique dessus pour accéder au
          dashboard admin. Le lien expire dans 10 minutes.
        </p>
      </div>
    </div>
  );
}
