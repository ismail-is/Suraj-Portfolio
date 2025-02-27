
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const blogPosts = {
  "future-web-dev": {
    title: "The Future of Web Development",
    description: "Exploring the latest trends and technologies shaping the future of web development.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800",
    date: "March 15, 2024",
    readTime: "5 min read",
    content: `
      The landscape of web development is constantly evolving, bringing new possibilities and challenges. As we look towards the future, several key trends and technologies are shaping how we build and interact with web applications.

      First, we're seeing a significant shift towards more immersive web experiences. Technologies like WebGL and WebXR are making it possible to create rich, 3D experiences directly in the browser. This opens up new possibilities for everything from e-commerce to educational platforms.

      Another major trend is the continued evolution of JavaScript frameworks and tools. While React continues to dominate the ecosystem, we're seeing new approaches to state management, build tools, and development workflows that make it easier than ever to create complex applications.

      Performance and accessibility are becoming increasingly central to web development. With Core Web Vitals now affecting search rankings, developers are putting more emphasis on creating fast, responsive websites that work well for all users.

      The rise of AI and machine learning is also impacting web development. From intelligent chatbots to personalized user experiences, AI is becoming an integral part of modern web applications.

      As we move forward, we can expect to see even more innovation in areas like:
      - Edge computing and distributed systems
      - Progressive Web Apps (PWAs)
      - Web Assembly and low-level programming
      - Real-time collaboration features
      - AI-powered development tools

      The future of web development is exciting and full of possibilities. By staying informed about these trends and continuously learning, developers can create better, more engaging web experiences for users around the world.
    `
  },
  "modern-ui-design": {
    title: "Mastering Modern UI Design",
    description: "Essential principles and practices for creating stunning user interfaces.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    date: "March 10, 2024",
    readTime: "4 min read",
    content: `
      Modern UI design is all about creating interfaces that are both beautiful and functional. In this post, we'll explore the key principles that make for great user interfaces.

      Consistency is key in modern UI design. Using a consistent color scheme, typography, and spacing throughout your application helps users navigate and understand your interface more easily.

      White space, or negative space, is another crucial element. Don't be afraid to give your elements room to breathe. Proper use of white space can make your design feel more elegant and help users focus on what's important.

      Typography plays a huge role in modern UI design. Choose fonts that are both readable and aesthetically pleasing. Consider the hierarchy of your text - headlines, subheadings, and body text should all be clearly distinguishable.

      Color theory is essential for creating attractive and effective interfaces. Understanding how colors work together and what emotions they evoke can help you create more engaging designs.

      Some key trends in modern UI design include:
      - Minimalist approaches
      - Micro-interactions
      - Dark mode
      - Glassmorphism
      - Responsive design

      Remember, good UI design isn't just about making things look pretty - it's about creating interfaces that are intuitive and enjoyable to use.
    `
  },
  "scalable-applications": {
    title: "Building Scalable Applications",
    description: "Best practices for creating applications that can grow with your business.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=800",
    date: "March 5, 2024",
    readTime: "6 min read",
    content: `
      Building scalable applications is crucial for long-term success in software development. A well-designed scalable application can handle growth in users, data, and functionality without requiring major rewrites.

      One of the key principles of scalable applications is modular design. Breaking your application into small, independent modules makes it easier to maintain, test, and modify as your needs grow.

      State management is another critical aspect of scalable applications. Using appropriate state management solutions and following best practices helps prevent your application from becoming unwieldy as it grows.

      Performance optimization should be considered from the start. This includes:
      - Efficient data structures and algorithms
      - Proper caching strategies
      - Code splitting and lazy loading
      - Database optimization

      Infrastructure considerations are also important. Choose technologies and hosting solutions that can grow with your application. Consider using cloud services that offer easy scaling options.

      Some best practices for building scalable applications include:
      - Writing clean, maintainable code
      - Implementing proper error handling
      - Using automated testing
      - Following design patterns
      - Documentation

      Remember, scalability isn't just about handling more users - it's about creating a foundation that can support your application's growth in all dimensions.
    `
  }
};

const BlogPost = () => {
  const { postId } = useParams();
  const post = postId ? blogPosts[postId as keyof typeof blogPosts] : null;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{post.description}</p>
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
