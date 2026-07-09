import { prisma } from "@/lib/prisma";
import { company } from "@/content";
import { SettingsManager } from "@/components/admin/SettingsManager";

export const metadata = { title: "Settings | SAF Admin" };

export default async function SettingsPage() {
  const settings = await prisma.companySettings.findUnique({ where: { id: "default" } });

  const initial = settings
    ? {
        name: settings.name,
        tagline: settings.tagline,
        description: settings.description,
        url: settings.url,
        email: settings.email,
        phones: JSON.parse(settings.phones) as string[],
        whatsapp: settings.whatsapp,
        location: settings.location,
        serviceAreas: JSON.parse(settings.serviceAreas) as string[],
        workingHoursWeekdays: settings.workingHoursWeekdays,
        workingHoursEmergency: settings.workingHoursEmergency,
        socialFacebook: settings.socialFacebook ?? "",
        socialInstagram: settings.socialInstagram ?? "",
        socialLinkedin: settings.socialLinkedin ?? "",
        founded: settings.founded,
      }
    : {
        name: company.name,
        tagline: company.tagline,
        description: company.description,
        url: company.url,
        email: company.email,
        phones: company.phones,
        whatsapp: company.whatsapp,
        location: company.location,
        serviceAreas: company.serviceAreas,
        workingHoursWeekdays: company.workingHours.weekdays,
        workingHoursEmergency: company.workingHours.emergency,
        socialFacebook: company.social.facebook,
        socialInstagram: company.social.instagram,
        socialLinkedin: company.social.linkedin,
        founded: company.founded,
      };

  return <SettingsManager initial={initial} />;
}
