function Home() {
    return(
        <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 relative"
      >
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-transparent to-purple-500/20 blur-3xl"></div>
        <div className="relative z-10 max-w-4xl text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 text-sm mb-6">
            Front-End React Developer
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Building Modern
            <span className="block text-cyan-400">React Websites</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            I create modern, responsive, and high-performance websites using
            React.js, Tailwind CSS, and modern front-end technologies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-8 py-4 rounded-2xl bg-cyan-400 text-black font-semibold hover:scale-105 transition duration-300"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="px-8 py-4 rounded-2xl border border-white/20 hover:border-cyan-400 hover:text-cyan-400 transition duration-300"
            >
              Hire Me
            </a>
          </div>
        </div>
      </section>
    )
}
export default Home;