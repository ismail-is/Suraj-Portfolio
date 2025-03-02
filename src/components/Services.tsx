
import { Award, BarChart, Globe, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Digital Strategy",
    description: "Comprehensive digital marketing strategies tailored to your business goals",
    icon: Target,
  },
  {
    title: "Social Media",
    description: "Engaging social media management and content creation",
    icon: Globe,
  },
  {
    title: "Analytics",
    description: "Data-driven insights and performance tracking",
    icon: BarChart,
  },
  {
    title: "Brand Growth",
    description: "Strategic brand development and market positioning",
    icon: Award,
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto reveal">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specialized digital marketing services to help your business thrive in the digital landscape
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
