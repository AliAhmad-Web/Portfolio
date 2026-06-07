const projects = [
    {
      title: "Modern Dashboard",
      desc: "Responsive admin dashboard with charts and analytics.",
      tech: ["React", "Tailwind", "Chart.js"],
    },
    {
      title: "E-Commerce UI",
      desc: "Modern online store UI with cart and filtering system.",
      tech: ["React", "Redux", "Tailwind"],
    },
    {
      title: "AI Landing Page",
      desc: "Clean AI SaaS landing page with animations.",
      tech: ["React", "Framer Motion", "CSS"],
    },
  ];

  
function Projects() {
    return(
        <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Featured <span className="text-cyan-400">Projects</span>
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Some modern and responsive projects built using React.js and
              modern web technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-400 transition duration-300"
              >
                <div className="h-52 bg-linear-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center text-2xl font-bold text-white">
                  {project.title}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-6">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}
export default Projects;