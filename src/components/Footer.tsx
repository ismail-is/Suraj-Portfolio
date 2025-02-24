
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
    },
  ];

  return (
    <footer className="bg-muted/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-white">SP</span>
            </div>
            <span className="text-lg font-bold">Suraj Poojari</span>
          </div>
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Suraj Poojari. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
