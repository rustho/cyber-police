export async function getMessages(locale: string) {
  try {
    const messages = (await import(`./locales/${locale}/common.json`)).default;
    return messages;
  } catch (error) {
    if (!["en", "ru", "es"].includes(locale)) {
      return {};
    }
    throw new Error(`Failed to load messages for locale: ${locale}`);
  }
}
