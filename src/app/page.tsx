import Discography from "@/components/Discography";
import { Section } from "lucide-react"; // Just for types/icons if needed, but not using it here.

export default function Home() {
  // JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "Ade Music",
    "url": "https://ade-music.com",
    "image": "https://ade-music.com/opengraph-image",
    "sameAs": [
      "https://instagram.com/ade_music",
      "https://youtube.com/ade_music",
      "https://spotify.com/artist/ade_music"
    ],
    "jobTitle": ["Singer", "Songwriter", "Beatmaker", "Mixing & Mastering Engineer"],
    "track": [
      {
        "@type": "MusicRecording",
        "name": "Paranoia",
        "duration": "PT2M45S"
      },
      {
        "@type": "MusicRecording",
        "name": "Serotonina",
        "duration": "PT3M12S"
      },
      {
        "@type": "MusicRecording",
        "name": "It Goes Dark",
        "duration": "PT4M20S"
      }
    ]
  };

  return (
    <main className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-0" />
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter relative z-10 text-center">
          ADE MUSIC
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white/70 relative z-10 tracking-widest uppercase">
          SINGER · PRODUCER · ENGINEER
        </p>
      </section>

      {/* Discography */}
      <Discography />

      {/* Services */}
      <section className="py-20 px-6 bg-black text-white border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 tracking-tighter">SERVICES</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white/5">
              <h3 className="text-xl font-bold mb-2">Mixing</h3>
              <p className="text-white/60">Professional balanced mixdown for your tracks.</p>
            </div>
            <div className="p-6 rounded-lg bg-white/5">
              <h3 className="text-xl font-bold mb-2">Mastering</h3>
              <p className="text-white/60">Industry standard loudness and clarity.</p>
            </div>
            <div className="p-6 rounded-lg bg-white/5">
              <h3 className="text-xl font-bold mb-2">Beatmaking</h3>
              <p className="text-white/60">Custom instrumentals tailored to your style.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-black text-white border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 tracking-tighter">ABOUT</h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Ade Music is a multifaceted artist and engineer delivering a unique sonic experience.
            With a focus on Afro-Trap, Electronic, and experimental sounds, Ade pushes the boundaries
            of modern music production.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 bg-black text-white border-t border-white/5 pb-40">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 tracking-tighter">CONTACT</h2>
          <a href="mailto:contact@ademusic.com" className="text-2xl hover:text-purple-400 transition-colors underline">
            contact@ademusic.com
          </a>
        </div>
      </section>
    </main>
  );
}
