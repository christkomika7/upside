import { usePathname } from 'next/navigation';

export const useLocalizedPath = () => {
  const pathname = usePathname();
  const lang = pathname.startsWith('/fr') ? 'fr' : 'en';
  const getPath = (path: string) => {
    if (path.startsWith(`/${lang}`)) return path;
    return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
  };

  return { lang, getPath };
};
