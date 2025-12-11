import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = 'en'; // luego puedes hacerlo dinámico

  const messages = {
    ...(await import(`../../messages/${locale}/home.json`)).default,
      ...(await import(`../../messages/${locale}/navbar.json`)).default,
      ...(await import(`../../messages/${locale}/register.json`)).default,
      ...(await import(`../../messages/${locale}/validator.json`)).default,
      ...(await import(`../../messages/${locale}/login.json`)).default,
      ...(await import(`../../messages/${locale}/servicesSection.json`)).default,
      ...(await import(`../../messages/${locale}/mug.json`)).default,
      ...(await import(`../../messages/${locale}/tumbler.json`)).default,
   
  };

  return {
    locale,
    messages
  };
});
