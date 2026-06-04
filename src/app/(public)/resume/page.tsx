import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { getResumeSections } from "@/features/resume/queries";
import type { ResumeData, ResumeSection } from "@/features/resume/types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume — Experience, Skills & Education",
  description:
    "Professional resume of Sherwin Jefferson Tajan (NightDev) — Full Stack Software Developer with experience in React, Next.js, TypeScript, Python, FastAPI, .NET, Avalonia UI, Docker, PostgreSQL, and DevOps workflows.",
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: "Resume — NightDev",
    description:
      "Professional resume of Sherwin Jefferson Tajan — Full Stack Software Developer experienced in web, desktop, and DevOps.",
  },
};

function formatDateRange(start?: string, end?: string): string {
  if (!start) return "";
  const fmt = (d: string) => {
    const date = new Date(d);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  if (end) return `${fmt(start)} — ${fmt(end)}`;
  return `${fmt(start)} — Present`;
}

function parseResumeData(sections: ResumeSection[]): ResumeData {
  const personalInfoSection = sections.find(
    (s) => s.section_type === "personal_info",
  );
  const meta = personalInfoSection?.metadata || {};

  const personalInfo = {
    name: personalInfoSection?.title || "NightDev",
    title: personalInfoSection?.subtitle || "Software Engineer",
    summary: personalInfoSection?.description || "",
    email: (meta.email as string) || "",
    phone: (meta.phone as string) || "",
    location: (meta.location as string) || "",
    linkedin: (meta.linkedin as string) || "",
    website: (meta.website as string) || "",
  };

  const experience = sections
    .filter((s) => s.section_type === "experience")
    .sort((a, b) => a.order_index - b.order_index)
    .map((s) => {
      const m = s.metadata || {};
      return {
        id: s.id,
        company: s.title || "",
        role: s.subtitle || "",
        period: formatDateRange(m.start_date as string, m.end_date as string),
        location: (m.location as string) || "",
        description: s.description || "",
        tech_stack: (m.tech_stack as string[]) || [],
      };
    });

  const education = sections
    .filter((s) => s.section_type === "education")
    .sort((a, b) => a.order_index - b.order_index)
    .map((s) => {
      const m = s.metadata || {};
      return {
        id: s.id,
        school: s.title || "",
        degree: s.subtitle || "",
        period: formatDateRange(m.start_date as string, m.end_date as string),
        location: (m.location as string) || "",
      };
    });

  const awards = sections
    .filter((s) => s.section_type === "awards")
    .sort((a, b) => a.order_index - b.order_index)
    .map((s) => {
      const m = s.metadata || {};
      return {
        id: s.id,
        title: s.title || "",
        year: (m.year as string) || "",
      };
    });

  const skillsSection = sections.find((s) => s.section_type === "skills");
  const skillsMeta = skillsSection?.metadata || {};

  const skills = {
    core: (skillsMeta.core as string[]) || [],
    technical: (skillsMeta.technical as string[]) || [],
    soft: (skillsMeta.soft as string[]) || [],
  };

  return { personalInfo, experience, education, awards, skills };
}

export default async function ResumePage() {
  const sections = await getResumeSections();
  const data = parseResumeData(sections);

  return (
    <div className="pt-20">
      <div className="py-20 px-6 max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <p className="font-mono text-sm text-primary mb-2">Resume</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {data.personalInfo.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {data.personalInfo.title}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground mt-4">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {data.personalInfo.location}
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-3 w-3" />
                <a href={`${data.personalInfo.linkedin}`}>
                  {data.personalInfo.linkedin}
                </a>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <a href={`${data.personalInfo.website}`}>
                  {data.personalInfo.website}
                </a>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Professional Summary
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Experience
            </h2>
            {data.experience.map((job) => (
              <div key={job.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h3 className="font-medium text-sm">{job.company}</h3>
                  <span className="text-xs text-muted-foreground font-mono">
                    {job.period}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 mb-2">
                  <p className="text-sm text-primary">{job.role}</p>
                  <span className="text-xs text-muted-foreground">
                    {job.location}
                  </span>
                </div>
                {job.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    {job.description}
                  </p>
                )}
                {job.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {job.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {(data.skills.core.length > 0 ||
          data.skills.technical.length > 0 ||
          data.skills.soft.length > 0) && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Technical Skills
            </h2>
            <div className="space-y-3">
              {data.skills.core.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-1.5">Core</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.core.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.technical.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-1.5">
                    Technologies & Tools
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.technical.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.soft.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-1.5">Soft Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.soft.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h3 className="font-medium text-sm">{edu.school}</h3>
                  <span className="text-xs text-muted-foreground font-mono">
                    {edu.period}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                  <p className="text-sm text-muted-foreground">{edu.degree}</p>
                  <span className="text-xs text-muted-foreground">
                    {edu.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {data.awards.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Awards
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-muted-foreground">
              {data.awards.map((award) => (
                <li key={award.id}>
                  {award.title}
                  {award.year ? ` — ${award.year}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 flex justify-center">
          <Button size="default" className="gap-2" asChild>
            <a href="/resume/sherwin-tajan-resume.pdf" download>
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
