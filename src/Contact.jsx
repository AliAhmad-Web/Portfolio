function Contact () {
    return (
        <section id="contact" className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Let's Work <span className="text-cyan-400">Together</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Have a project idea or want to build a modern website? Let's create
            something amazing together.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            />
          </div>

          <textarea
            rows="6"
            placeholder="Your Message"
            className="w-full mt-6 bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
          />

          <button className="mt-8 px-10 py-4 rounded-2xl bg-cyan-400 text-black font-semibold hover:scale-105 transition duration-300">
            Send Message
          </button>
        </div>
      </section>
    )
}

export default Contact;