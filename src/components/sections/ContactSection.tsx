import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG, EmailTemplateParams } from "../../config/emailjs";

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } =
    useScrollAnimation<HTMLFormElement>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!EMAILJS_CONFIG.PUBLIC_KEY || !EMAILJS_CONFIG.TEMPLATE_ID) {
        throw new Error(
          "EmailJS no está configurado correctamente. Revisa la configuración."
        );
      }

      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      const templateParams: EmailTemplateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Homer Portes",
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      toast({
        title: "¡Mensaje enviado exitosamente!",
        description: "Gracias por tu mensaje. Te responderé pronto.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      const isConfigError =
        errorMessage.includes("configurado") ||
        errorMessage.includes("Public Key");

      toast({
        title: isConfigError
          ? "Configuración pendiente"
          : "Error al enviar mensaje",
        description: isConfigError
          ? "EmailJS necesita configuración. Revisa EMAILJS_SETUP.md para instrucciones."
          : "Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-2xl mx-auto relative z-10">
        <Card className="bg-slate-800/90 rounded-2xl shadow-2xl overflow-hidden border-slate-700/40">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            {/* Header */}
            <div
              ref={headerRef}
              className={`text-center transition-all duration-1000 ${
                headerVisible
                  ? "animate-fade-in-up opacity-100"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {t("contact.title")}
              </h2>
              <div className="w-24 h-1 bg-purple-800 mx-auto my-4"></div>
              <p className="mt-3 text-lg text-gray-300">
                {t("contact.description")}
              </p>
            </div>

            {/* Contact Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`mt-10 space-y-6 transition-all duration-1000 ${
                formVisible
                  ? "animate-fade-in opacity-100"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <label htmlFor="name" className="sr-only">
                  {t("contact.name")}
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("contact.name")}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="rounded-full border-0 bg-slate-700/50 px-5 py-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 transition-all duration-300 ease-in-out"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  {t("contact.email")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("contact.email")}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="rounded-full border-0 bg-slate-700/50 px-5 py-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 transition-all duration-300 ease-in-out"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  {t("contact.message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("contact.message")}
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="rounded-3xl border-0 bg-slate-700/50 px-5 py-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-800 transition-all duration-300 ease-in-out"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center items-center gap-2 rounded-full bg-purple-800 px-8 py-4 text-base font-bold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800 transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>{t("contact.send")}</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="border-t border-slate-700/40 bg-slate-900/50 px-6 py-4 sm:px-10">
            <div className="flex justify-center items-center space-x-6">
              <a
                href="https://github.com/homerportes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-300 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/homerportes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-300 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:homerportes@gmail.com"
                className="text-gray-400 hover:text-purple-300 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                homerportes@gmail.com • 829 932 2619
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
