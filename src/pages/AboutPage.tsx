import {
  Activity,
  Bell,
  BookOpen,
  Cpu,
  Info,
  Radar,
  Users,
  Zap,
} from 'lucide-react';

function Feature({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: typeof Info;
}) {
  return (
    <article className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-violet-400/[0.045]">
      <div className="mb-4 inline-flex rounded-xl border border-violet-400/15 bg-violet-400/10 p-2.5 text-violet-300 transition group-hover:border-violet-300/30 group-hover:bg-violet-400/15">
        <Icon size={18} />
      </div>
      <h3 className="font-semibold text-slate-100">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{description}</p>
    </article>
  );
}

export function AboutPage() {
  return (
    <main className="min-h-full space-y-6 rounded-3xl bg-[#090711] p-4 text-slate-100 sm:p-6 lg:p-8">
      <section className="relative isolate overflow-hidden rounded-3xl border border-violet-300/10 bg-[#100c1d] px-6 py-8 shadow-2xl shadow-black/20 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 right-1/3 -z-10 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="flex max-w-4xl items-start gap-4 sm:gap-5">
          <div className="mt-1 hidden rounded-2xl border border-violet-300/15 bg-violet-400/10 p-3.5 text-violet-200 sm:block">
            <Info size={22} />
          </div>
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-400/[0.07] px-3 py-1 text-xs font-medium tracking-wide text-violet-200">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
              TENTANG PLATFORM
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Pertumbuhan yang lebih cerdas, <span className="text-violet-300">dimulai di sini.</span>
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              Hydrogenix adalah platform monitoring tanaman berbasis IoT yang membantu petani menjaga kondisi pertumbuhan lebih konsisten melalui
              data sensor, kontrol perangkat, dan dukungan analitik.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/[0.08] bg-[#100e19] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">Cerita di balik nama</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">Tentang Hydrogenix</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Hydrogenix menghadirkan pemantauan tanaman cerdas berbasis IoT dalam satu platform. Data sensor, kendali perangkat,
            dan analitik membantu perawatan tanaman menjadi lebih terukur dan efisien.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {['IoT Monitoring', 'Kontrol Otomatis', 'Efisiensi Air'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-violet-300/15 bg-violet-400/[0.07] px-3 py-1.5 text-xs font-medium text-violet-200"
              >
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-white/[0.08] bg-[#100e19] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">Dibangun untuk merawat</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">Fitur Utama</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Hydrogenix dirancang untuk memberi visibilitas real-time, tindakan cepat, dan panduan berbasis AI agar keputusan perawatan
            tanaman lebih tepat.
          </p>
          <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
            <div className="rounded-xl border border-violet-300/15 bg-violet-400/10 p-2.5 text-violet-300">
              <Activity size={18} />
            </div>
            <p className="text-sm text-slate-300">
              Data sensor, kontrol perangkat, dan analitik dalam satu platform.
            </p>
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-white/[0.08] bg-[#100e19] p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-violet-300/15 bg-violet-400/10 p-2.5 text-violet-300">
            <Users size={19} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">Di balik Hydrogenix</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">Tim Pengembang</h2>
          </div>
        </div>

        <div className="mt-6 grid gap-6 border-t border-white/[0.07] pt-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Tim C.R.E.S.T</h3>
            <p className="mt-1 text-sm text-slate-400">(Club Riset Elektronika Stemsa)</p>
            <p className="mt-3 text-sm font-medium text-slate-200">SMK Negeri 1 Semarang</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Pembimbing</h4>
            <p className="mt-2 text-sm font-medium text-slate-200">Rifqi Setiawan S.Pd</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Anggota Tim</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-300">
              <li>Genade Revandhiko El Diviano</li>
              <li>Raffa Andriyana Alfiansyah</li>
              <li>Khalila Nur Medina Putri</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">Yang bisa Anda lakukan</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">Satu sistem, kendali lebih menyeluruh.</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          <Feature
            title="Monitoring Real-time"
            description="Lihat pembacaan sensor (suhu, kelembapan udara, kelembapan tanah, status pompa/lampu) secara berkala dari perangkat ESP32."
            icon={Activity}
          />
          <Feature
            title="Kontrol Perangkat"
            description="Aktifkan atau nonaktifkan perangkat (mis. pompa/lampu) melalui panel kontrol sesuai kebutuhan."
            icon={Zap}
          />
          <Feature
            title="Alert & Notifikasi"
            description="Sistem akan memberi peringatan saat nilai melewati ambang batas (mis. suhu tinggi atau kelembapan tanah rendah)."
            icon={Bell}
          />
          <Feature
            title="Log & Analitik"
            description="Pantau histori dan analisa perubahan data untuk membantu evaluasi perawatan tanaman."
            icon={BookOpen}
          />
          <Feature
            title="Hydrogenix AI"
            description="Gunakan AI untuk mendapatkan saran perawatan dan penjelasan berdasarkan data sensor dan konteks tanaman."
            icon={Radar}
          />
          <Feature
            title="Integrasi MQTT/ESP32"
            description="Komunikasi perangkat IoT menggunakan MQTT agar data sensor tersalurkan ke web dengan cepat dan andal."
            icon={Cpu}
          />
        </div>
      </section>
    </main>
  );
}
