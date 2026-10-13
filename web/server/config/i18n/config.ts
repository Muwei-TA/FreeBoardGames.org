export const i18n = getI18n();

export function getI18n() {
  return {
    defaultLocale: 'zh',
    locales: ['zh', ...otherLanguages()],
  };
}

function otherLanguages() {
  return [];
}
