# EmailJS Setup Instructions

## ⚠️ Current Issue
You're getting a 400 error because the Public Key is missing or invalid. Follow these steps to fix it:

## 1. Get Your EmailJS Credentials
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin/account)
2. Copy your **Public Key** from the Account page
3. Go to "Email Templates" and create a new template
4. Copy the **Template ID** after creating the template

## 2. Quick Fix - Update Configuration
Edit `src/config/emailjs.ts` and replace:
```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_4sgftel',
  TEMPLATE_ID: 'your_actual_template_id', // Replace with your template ID
  PUBLIC_KEY: 'your_actual_public_key', // Replace with your public key
};
```

## 3. Email Template Structure
When creating your template, use these variable names:
```
Subject: Nuevo mensaje de contacto - {{from_name}}

Hola Homer,

Tienes un nuevo mensaje de contacto:

Nombre: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}

---
Enviado desde tu portfolio
```

## 4. Test After Setup
1. Update the configuration with real values
2. The form will automatically work with proper credentials
3. You'll receive emails directly to your configured email address

## Current Status
- ✅ Service ID configured: `service_4sgftel`
- ❌ Public Key: **NEEDS TO BE ADDED**
- ❌ Template ID: **NEEDS TO BE ADDED**

The contact form has all the animations and functionality ready - just needs the EmailJS credentials!
