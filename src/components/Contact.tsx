
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      timestamp: new Date().toISOString(),
    };

    try {
      // Replace this URL with your Google Apps Script Web App URL that you copied in step 2
      const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      // Reset the form
      e.currentTarget.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error sending your message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4" id="contact">
      <div className="max-w-4xl mx-auto reveal">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to elevate your digital presence? Let's discuss how I can help your business grow.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Input name="name" placeholder="Name" className="h-12" required />
            </div>
            <div className="space-y-2">
              <Input name="email" type="email" placeholder="Email" className="h-12" required />
            </div>
          </div>
          <div className="space-y-2">
            <Input name="subject" placeholder="Subject" className="h-12" required />
          </div>
          <div className="space-y-2">
            <Textarea name="message" placeholder="Message" className="min-h-[150px]" required />
          </div>
          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};
