import { useTranslation } from "next-i18next";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember = ({ name, role, image }: TeamMemberProps) => (
  <div className="group relative">
    {/* Neon border effect */}
    <div
      className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 
      rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 
      group-hover:duration-200 animate-tilt"
    ></div>

    <div className="relative flex flex-col items-center p-6 bg-gray-800 rounded-lg">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src={"https://placekitten.com/400/300"}
          alt={name}
          fill
          className="rounded-full object-cover"
        />
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full 
          bg-gradient-to-r from-blue-500/20 to-purple-500/20 
          opacity-0 group-hover:opacity-100 transition-opacity"
        ></div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-blue-400">{role}</p>
    </div>
  </div>
);

export const Team = () => {
  const { t } = useTranslation();
  const members = t("team.members", { returnObjects: true });

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          {t("team.title")}
        </h2>

        {/* Team members grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {members.map((member: TeamMemberProps, index: number) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>

        {/* Contact section */}
        <div className="text-center">
          <p className="text-gray-300 mb-6">
            {t("team.contact.intro")}{" "}
            <a
              href={`mailto:${t("team.contact.email")}`}
              className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
            >
              @{t("team.contact.email")}
            </a>{" "}
            {t("team.contact.or")}{" "}
            <a
              href={`https://t.me/${t("team.contact.telegram").substring(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
            >
              telegram
              {t("team.contact.telegram")}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
