export default function Contact() {
    return (
        <div className="max-w-3xl mx-auto h-screen p-6">
            {/* Page title */}
            <h1 className="text-2xl font-bold mb-4 text-red-500">Contact Us</h1>
            
            {/* Description */}
            <p className="text-gray-700 mb-4">
                Have questions or feedback? Reach out to us using the form below or email us directly.
            </p>
            
            {/* Contact form */}
            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    rows="5"
                    placeholder="Your Message"
                    className="border p-2 rounded"
                    required
                />
                <button 
                    type="submit" 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}
