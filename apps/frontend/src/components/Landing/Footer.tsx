import { useTranslation } from "next-i18next";
import Image from "next/image";

const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
    aria-label={label}
  >
    <Icon className="w-6 h-6" />
  </a>
);

export const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      href: "https://discord.gg/cyberpolice",
      icon: <></>,
      label: t("footer.social.discord"),
    },
    {
      href: "https://t.me/cyberpolice",
      icon: <></>,
      label: t("footer.social.telegram"),
    },
    {
      href: "https://twitter.com/cyberpolice",
      icon: <></>,
      label: t("footer.social.twitter"),
    },
    {
      href: "https://youtube.com/cyberpolice",
      icon: <></>,
      label: t("footer.social.youtube"),
    },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Copyright */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative w-10 h-10 mr-4">
              <Image
                src="https://placekitten.com/400/300"
                alt="Cyber Police Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-gray-400 text-sm">
              {t("footer.copyright")}
            </span>
          </div>

          {/* Social Links and Version */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-2">
              {socialLinks.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
            </div>
            <span className="text-gray-500 text-sm">{t("footer.version")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
