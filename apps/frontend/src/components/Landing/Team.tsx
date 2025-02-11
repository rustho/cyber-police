import { useTranslation } from "next-i18next";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  spriteIndex: number;
}

const TeamMember = ({ name, role, spriteIndex }: TeamMemberProps) => (
  <div className="text-center">
    <div className="relative w-32 h-32 mx-auto mb-4">
      <div
        className="w-full h-full rounded-full overflow-hidden"
        style={{
          background: `url('/images/avatars_set.webp') ${spriteIndex * 100}% 0`,
          backgroundSize: "565% 200%", // Assuming 4 avatars in a row
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
    <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
    <p className="text-gray-400">{role}</p>
  </div>
);

export const Team = () => {
  const { t } = useTranslation();
  const members = (t("team.members", { returnObjects: true }) as any[]).map(
    (member, index) => ({
      ...member,
      spriteIndex: index,
    })
  );

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
