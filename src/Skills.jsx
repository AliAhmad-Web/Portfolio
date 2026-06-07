function Skills(){
    return(
        <section id="skills" className="py-24 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            My <span className="text-cyan-400">Skills</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-14 text-lg">
            Technologies and tools I use to build high-quality modern web
            applications.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "JavaScript",
              "React.js",
              "Node.js",
              "HTML5",
              "CSS3",
              "Tailwind CSS",
              "Git",
              "API Integration",
              "Responsive Design",
              "vibe coding"
            ].map((skill, index) => (
              <div
                key={index}
                className="bg-black/40 border border-white/10 rounded-2xl py-6 px-4 hover:border-cyan-400 hover:-translate-y-2 transition duration-300"
              >
                <h3 className="font-semibold text-lg">{skill}</h3>
              </div>
            ))}
       
          </div>
        </div>
      </section>
    )
}
export default Skills;