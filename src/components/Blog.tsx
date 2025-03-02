
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: "future-web-dev",
    title: "The Future of Web Development",
    description: "Exploring the latest trends and technologies shaping the future of web development.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800",
    date: "March 15, 2024",
    readTime: "5 min read"
  },
  {
    id: "modern-ui-design",
    title: "Mastering Modern UI Design",
    description: "Essential principles and practices for creating stunning user interfaces.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    date: "March 10, 2024",
    readTime: "4 min read"
  },
  {
    id: "scalable-applications",
    title: "Building Scalable Applications",
    description: "Best practices for creating applications that can grow with your business.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=800",
    date: "March 5, 2024",
    readTime: "6 min read"
  }
];

export const Blog = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30" id="blog">
      <div className="max-w-6xl mx-auto reveal">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest insights, tutorials, and industry news.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full border border-border/50 hover:border-primary/20">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-primary group-hover:underline inline-flex items-center">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
