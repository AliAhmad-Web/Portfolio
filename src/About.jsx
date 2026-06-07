function About (){
    return(
        <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              About <span className="text-cyan-400">Me</span>
            </h2>

            <p className="text-gray-400 leading-relaxed text-lg mb-6">
              I am a passionate Front-End Developer focused on creating modern,
              interactive, and user-friendly web applications. I love building
              clean UI designs and responsive websites using React.js.
            </p>

            <p className="text-gray-400 leading-relaxed text-lg">
              My goal is to create fast, scalable, and visually stunning web
              experiences that help businesses grow online.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full" />

            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-lg shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Experience</h3>
                  <p className="text-xl font-semibold">React Front-End Developer</p>
                </div>

                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Specialization</h3>
                  <p className="text-xl font-semibold">
                    Modern UI / Responsive Design
                  </p>
                </div>

                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Location</h3>
                  <p className="text-xl font-semibold">Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
export default About;