import { cookies } from "next/headers";
import translations, { Locale, TranslationKey } from "./translations";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get("locale")?.value;
  return value === "fr" ? "fr" : "en";
}

export async function getTranslations() {
  const locale = await getLocale();
  return (key: TranslationKey) => translations[locale][key];
}
