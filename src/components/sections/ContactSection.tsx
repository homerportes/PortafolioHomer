import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Gracias por tu mensaje. Te responderé pronto.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card rounded-2xl shadow-2xl overflow-hidden border-border animate-scale-in">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-hero">
                Hablemos
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                ¿Tienes un proyecto en mente? Me encantaría escucharlo.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nombre
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="rounded-full border-0 bg-black/20 px-5 py-4 text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300 ease-in-out"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="sr-only">
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="rounded-full border-0 bg-black/20 px-5 py-4 text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300 ease-in-out"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="sr-only">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Cuéntame sobre tu idea..."
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="rounded-3xl border-0 bg-black/20 px-5 py-4 text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300 ease-in-out"
                />
              </div>
              
              <div>
                <Button 
                  type="submit"
                  className="flex w-full justify-center items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-transform duration-300 hover:scale-105"
                >
                  <span>Enviar Mensaje</span>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Social Links */}
          <div className="border-t border-border bg-black/10 px-6 py-4 sm:px-10">
            <div className="flex justify-center items-center space-x-6">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="mailto:elena@example.com" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                elena.ramirez@example.com • +34 123 456 789
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;