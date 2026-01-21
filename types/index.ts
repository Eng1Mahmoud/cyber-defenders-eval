export type SkillLevel = "Novice" | "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type CertType = "blue" | "red" | "infoSec";

export interface Certification {
    id: number;
    slug: string;
    title: string;
    abbreviation: string;
    description: string;
    image: string;
    url: string;
    cost: string;
    training_included: boolean;
    number_of_attempts: number;
    job_roles_titles: string[];
    cert_type: CertType;
    total_votes: number;
    market_presence: number; // 0.0 to 1.0
    cost_effectiveness: number; // 1.0 to 5.0
    skill_level: SkillLevel;
    quality: number; // 1.0 to 5.0
    satisfaction: number; // 1.0 to 5.0
    provider: {
        name: string;
        url: string;
        image: string;
    } | null;
    domains_covered_titles: string[];
    requirements_data: {
        knowledge: string;
        work_experience: string;
        prior_courses_and_certifications: string;
    };
    exam_details_data: {
        format: string;
        duration: string | null;
        report_required: boolean;
    };
    valid_for: string | null;
}

export interface FilterBarProps {
    selectedType: CertType | "all";
    setSelectedType: (val: CertType | "all") => void;
    selectedSkill: SkillLevel | "all";
    setSelectedSkill: (val: SkillLevel | "all") => void;
    searchQuery: string;
    setSearchQuery: (val: string) => void;
}


export interface CertScatterPlotProps {
    data: Certification[];
    onNodeClick: (cert: Certification) => void;
}

export interface QuadrantLabelProps {
    viewBox?: { x: number; y: number; width: number; height: number };
    text: string;
}

export interface ChartTooltipProps {
    active?: boolean;
    payload?: { payload: Certification }[];
}

export interface ChartNodeProps {
    cx?: number;
    cy?: number;
    fill?: string;
    payload?: Certification;
    onClick?: (payload: any) => void;
}
