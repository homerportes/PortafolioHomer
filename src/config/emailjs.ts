// EmailJS Configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_4sgftel',
  TEMPLATE_ID: 'template_6fbojee',
  PUBLIC_KEY: 'fYRJ-IMsc6835Gnzi',
};

// Template variables that will be sent to EmailJS
export interface EmailTemplateParams extends Record<string, unknown> {
  from_name: string;
  from_email: string;
  message: string;
  to_name: string;
}
