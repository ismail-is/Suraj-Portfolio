
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Contact = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto reveal">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to elevate your digital presence? Let's discuss how I can help your business grow.
          </p>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Input placeholder="Name" className="h-12" />
            </div>
            <div className="space-y-2">
              <Input type="email" placeholder="Email" className="h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <Input placeholder="Subject" className="h-12" />
          </div>
          <div className="space-y-2">
            <Textarea placeholder="Message" className="min-h-[150px]" />
          </div>
          <Button size="lg" className="w-full md:w-auto">Send Message</Button>
        </form>
      </div>
    </section>
  );
};
