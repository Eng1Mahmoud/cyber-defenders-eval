import { Certification, CertType, SkillLevel } from "@/types";

const CERT_TYPES: CertType[] = ["blue", "red", "infoSec"];
const SKILL_LEVELS: SkillLevel[] = ["Novice", "Beginner", "Intermediate", "Advanced", "Expert"];

const MOCK_TITLES = [
    // Red Team
    "Offensive Security Certified Professional (OSCP)", "Certified Ethical Hacker (CEH)", "GXPN", "eJPT", "OSWE",
    // Blue Team
    "Certified Information Systems Security Professional (CISSP)", "CISA", "Security+", "CySA+", "CASP+", "GCIH", "GCFA",
    // InfoSec / Cloud / Management
    "CISM", "CCSP", "AWS Security Specialty", "Azure Security Engineer", "Google Cloud Security Engineer"
];

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number, decimals: number = 1) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

function generateMockCert(id: number): Certification {
    const isReal = id < MOCK_TITLES.length;
    const title = isReal ? MOCK_TITLES[id] : `Cyber Cert ${id + 1}`;
    const abbr = title.match(/\(([^)]+)\)/)?.[1] || title.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 5);
    const type = isReal
        ? (["OSCP", "CEH", "eJPT", "OSWE", "GXPN"].some(t => title.includes(t)) ? "red" :
            ["CISSP", "CISM", "CCSP", "Security+"].some(t => title.includes(t)) ? "infoSec" : "blue")
        : CERT_TYPES[getRandomInt(0, 2)];

    return {
        id,
        slug: abbr.toLowerCase(),
        title,
        abbreviation: abbr,
        description: "A comprehensive certification for cybersecurity professionals focusing on practical skills and theoretical knowledge.",
        image: "/placeholder.svg",
        url: "https://example.com",
        cost: `$${getRandomInt(300, 1500)}`,
        training_included: Math.random() > 0.5,
        number_of_attempts: getRandomInt(1, 3),
        job_roles_titles: ["Security Analyst", "Penetration Tester", "Security Engineer"],
        cert_type: type,
        total_votes: getRandomInt(10, 5000), // Allow smaller vote counts
        market_presence: getRandomFloat(0.05, 0.95, 2), // Full width
        cost_effectiveness: getRandomFloat(1.0, 5.0),
        skill_level: SKILL_LEVELS[getRandomInt(0, 4)],
        quality: getRandomFloat(1.0, 5.0),
        satisfaction: getRandomFloat(1.0, 5.0), // Full height to hit bottom quadrants
        provider: {
            name: "CyberOrg",
            url: "https://cyberorg.com",
            image: "/placeholder.svg"
        },
        domains_covered_titles: ["Network Security", "Risk Management", "Cryptography"],
        requirements_data: {
            knowledge: "Basic networking",
            work_experience: "2-5 years",
            prior_courses_and_certifications: "None"
        },
        exam_details_data: {
            format: "Multiple Choice",
            duration: "3 hours",
            report_required: false
        },
        valid_for: "3 years"
    };
}

export const MOCK_DATA: Certification[] = Array.from({ length: 60 }, (_, i) => generateMockCert(i));
